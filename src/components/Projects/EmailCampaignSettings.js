"use client"
import React, { useState, useEffect } from 'react';
import { Edit3, Settings, Mail, Target, Calendar, Activity } from 'lucide-react';
import { axiosPublic } from '@/app/api/constant';
import { toast } from 'react-toastify';
 
const EmailCampaignSettings = ({execId}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [campaignData, setCampaignData] = useState(null);
  const[data,setdata] = useState(null);
 
  const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
 
  const fetchCampaignData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://stu.globalknowledgetech.com:8444/campaigns/getbyid?execution_id=${execId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const apiResult = await response.json();
      const data = apiResult.data;

      setdata(apiResult.data);
 
      const audience = (data.targetAudience && data.targetAudience[0]) ? data.targetAudience[0] : {};
      const types = {};
      (data.campaignTypes || []).forEach(t => {
        types[t.campaign_type] = {
          ...t,
          enabled: !!t.is_active,
          label: t.campaign_type
        };
      });
 
      const tracking = (data.tracking && data.tracking[0]) ? {
        open_tracking: data.tracking[0].open_tracking,
        click_tracking: data.tracking[0].click_tracking,
        intent_classification: data.tracking[0].intent_classification,
        reply_classification: data.tracking[0].reply_tracking,
        bounce_tracking: data.tracking[0].bounce_tracking,
      } : {};
 
      const scheduleObj = (data.schedules && data.schedules[0]) ? {
        start_date: data.schedules[0].start_date,
        end_date: data.schedules[0].end_date,
        sending_window: {
          days: data.schedules[0].sending_window_days || [],
          time_range: (data.schedules[0].sending_window_time_range
            ? data.schedules[0].sending_window_time_range.split('–')
            : ["09:00", "17:00"]
          )
        },
        daily_send_limit: data.schedules[0].daily_send_limit || 0,
        timezone: data.schedules[0].timezone || 'UTC',
      } : {};
 
      const phases = (data.phases || []).map(phase => ({
        ...phase,
        email_sequence: (phase.sequences || []).map(seq => ({
          subject: seq.subject,
          wait_days: seq.wait_days,
          body: seq.body,
          type: seq.type,
        })),
      }));
 
      setCampaignData({
        campaign_id: data.campaign_id,
        campaign_name: data.campaign_name,
        campaign_types: types,
        target_audience: {
          industry: audience.industries || [],
          locations: audience.locations || [],
          roles: audience.roles || [],
        },
        campaign_phases: phases,
        schedule: scheduleObj,
        tracking,
        smtp_config: {},
      });
 
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
 
  useEffect(() => {
    fetchCampaignData();
  }, []);
 
  const preparePayloadForUpsert = (data) => {
    return {
      campaign_id: data.campaign_id,
      campaign_name: data.campaign_name,
      campaignTypes: Object.entries(data.campaign_types).map(([type, config]) => ({
        campaign_type: type,
        is_active: config.enabled,
      })),
      targetAudience: [{
        industries: data.target_audience.industry || [],
        locations: data.target_audience.locations || [],
        roles: data.target_audience.roles || [],
      }],
      phases: (data.campaign_phases || []).map(phase => ({
        name: phase.name,
        description: phase.description,
        duration_days: phase.duration_days,
        sequences: (phase.email_sequence || []).map(seq => ({
          subject: seq.subject,
          wait_days: seq.wait_days,
          body: seq.body,
          type: seq.type,
        }))
      })),
      schedules: [{
        start_date: data.schedule.start_date,
        end_date: data.schedule.end_date,
        sending_window_days: data.schedule.sending_window.days,
        sending_window_time_range: (data.schedule.sending_window.time_range || []).join('–'),
        daily_send_limit: data.schedule.daily_send_limit || 0,
        timezone: data.schedule.timezone || 'UTC',
      }],
      tracking: [{
        open_tracking: data.tracking.open_tracking || false,
        click_tracking: data.tracking.click_tracking || false,
        intent_classification: data.tracking.intent_classification || false,
        reply_tracking: data.tracking.reply_classification || false,
        bounce_tracking: data.tracking.bounce_tracking || false,
      }],
      smtp_config: data.smtp_config || {},
    };
  };

  const handleStartCampagn = async () =>{

    const json = {
    "campaign_id": data.campaign_id,
    "execution_id": execId,
    "client_id": data.client_id,
    "created_by": data.created_by
}
    await axiosPublic.post(`v1/start-campaign`,json)
    .then(res =>{
        if(res.status === 201){
            toast.success("Campaign started successfully");
        }
    })
    .catch(err =>{
        toast.error("Error while starting campaign");
    })
  }
 
  const handleUpdateCampaign = async () => {
    if (!campaignData) return;
    try {
      setLoading(true);
      const payload = preparePayloadForUpsert(campaignData);
      const response = await fetch('http://stu.globalknowledgetech.com:4005/campaigns/upsert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const resJson = await response.json();
      if (!response.ok) {
        throw new Error(resJson.message || 'Failed to update campaign');
      }
      await fetchCampaignData();
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
 
  const handleCampaignTypeChange = (type) => {
    if (!isEditing || !campaignData) return;
    setCampaignData(prev => ({
      ...prev,
      campaign_types: {
        ...prev.campaign_types,
        [type]: {
          ...prev.campaign_types?.[type],
          enabled: !prev.campaign_types?.[type]?.enabled
        }
      }
    }));
  };
 
  const handleDayChange = (day) => {
    if (!isEditing || !campaignData) return;
    setCampaignData(prev => {
      const current = prev.schedule?.sending_window?.days || [];
      const updated = current.includes(day)
        ? current.filter(d => d !== day)
        : [...current, day];
      return {
        ...prev,
        schedule: {
          ...prev.schedule,
          sending_window: {
            ...prev.schedule?.sending_window,
            days: updated
          }
        }
      };
    });
  };
 
  const handlePhaseUpdate = (index, field, value) => {
    if (!campaignData) return;
    setCampaignData(prev => {
      const phases = [...(prev.campaign_phases || [])];
      phases[index] = { ...phases[index], [field]: value };
      return { ...prev, campaign_phases: phases };
    });
  };
 
  const updateEmailInPhase = (phaseIndex, emailIndex, field, value) => {
    if (!campaignData) return;
    setCampaignData(prev => {
      const phases = [...(prev.campaign_phases || [])];
      phases[phaseIndex].email_sequence[emailIndex] = {
        ...phases[phaseIndex].email_sequence[emailIndex],
        [field]: value
      };
      return { ...prev, campaign_phases: phases };
    });
  };
 
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-[#0056D2] mx-auto mb-4"></div>
          <p className="text-gray-600 text-xs text-center">Loading campaign data...</p>
        </div>
      </div>
    );
  }
 
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-red-200">
          <p className="text-red-600 text-xs mb-4 text-center">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full px-4 py-2 bg-[#0056D2] text-white text-xs rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
 
  if (!campaignData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-600 text-xs text-center">No campaign data available</p>
        </div>
      </div>
    );
  }
 
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-full px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-sm font-bold text-gray-900">Campaign Settings</h1>
              <p className="text-xs text-gray-500 mt-1">Manage your email campaign configuration</p>
            </div>
            <div className="flex gap-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex  items-center px-4 py-2 text-xs font-medium text-white bg-[#0056D2] hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Campaign
                </button>
                
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateCampaign}
                    className="px-4 py-2 text-xs font-medium text-white bg-[#0056D2] hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              )}
              <button
                  onClick={() => handleStartCampagn()}
                  className="flex  items-center px-4 py-2 text-xs font-medium text-white bg-[#0056D2] hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
                >
                  {/* <Edit3 className="h-4 w-4 mr-2" /> */}
                  Start Campaign
                </button>
            </div>
          </div>
        </div>
      </div>
 
      <div className="flex gap-6 p-6">
        {/* Left Sidebar */}
        <div className="w-80 space-y-6">
         
          {/* Campaign Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="bg-[#0056D2] px-4 py-3 rounded-t-lg">
              <div className="flex items-center text-white">
                <Settings className="h-4 w-4 mr-2" />
                <h2 className="text-xs font-semibold">Campaign Information</h2>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Campaign ID</label>
                <input
                  type="text"
                  value={campaignData.campaign_id || ''}
                  disabled
                  className="w-full px-2 py-1 border border-gray-300 bg-gray-50 text-gray-900 text-xs rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Campaign Name</label>
                <input
                  type="text"
                  value={campaignData.campaign_name || ''}
                  disabled
                  className="w-full px-2 py-1 border border-gray-300 bg-gray-50 text-gray-900 text-xs rounded-md"
                />
              </div>
            </div>
          </div>
 
          {/* Campaign Types */}
          {campaignData.campaign_types && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="bg-[#0056D2] px-4 py-3 rounded-t-lg">
                <div className="flex items-center text-white">
                  <Mail className="h-4 w-4 mr-2" />
                  <h2 className="text-xs font-semibold">Campaign Types</h2>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {Object.entries(campaignData.campaign_types).map(([type, config]) => (
                  <div key={type} className="flex items-center justify-between">
                    <span className="text-xs text-gray-700 font-medium">{config.label || type}</span>
                    <input
                      type="checkbox"
                      checked={config.enabled || false}
                      onChange={() => handleCampaignTypeChange(type)}
                      disabled={!isEditing}
                      className="h-3 w-3 text-[#0056D2] focus:ring-[#0056D2] border-gray-300 rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
 
          {/* Schedule */}
          {campaignData.schedule && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="bg-[#0056D2] px-4 py-3 rounded-t-lg">
                <div className="flex items-center text-white">
                  <Calendar className="h-4 w-4 mr-2" />
                  <h2 className="text-xs font-semibold">Schedule</h2>
                </div>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={campaignData.schedule.start_date || ''}
                      onChange={(e) => setCampaignData(prev => ({
                        ...prev,
                        schedule: { ...prev.schedule, start_date: e.target.value }
                      }))}
                      disabled={!isEditing}
                      className={`w-full px-2 py-1 border border-gray-300 ${isEditing ? 'bg-white' : 'bg-gray-50'} text-gray-900 text-xs rounded-md focus:ring-2 focus:ring-[#0056D2] focus:border-transparent`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      value={campaignData.schedule.end_date || ''}
                      onChange={(e) => setCampaignData(prev => ({
                        ...prev,
                        schedule: { ...prev.schedule, end_date: e.target.value }
                      }))}
                      disabled={!isEditing}
                      className={`w-full px-2 py-1 border border-gray-300 ${isEditing ? 'bg-white' : 'bg-gray-50'} text-gray-900 text-xs rounded-md focus:ring-2 focus:ring-[#0056D2] focus:border-transparent`}
                    />
                  </div>
                </div>
               
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Sending Days</label>
                  <div className="grid grid-cols-2 gap-2">
                    {allDays.map((day) => (
                      <label key={day} className="flex items-center text-xs text-gray-700">
                        <input
                          type="checkbox"
                          checked={(campaignData?.schedule?.sending_window?.days || []).includes(day)}
                          onChange={() => handleDayChange(day)}
                          disabled={!isEditing}
                          className="h-3 w-3 text-[#0056D2] focus:ring-[#0056D2] border-gray-300 rounded mr-2"
                        />
                        {day.substring(0, 3)}
                      </label>
                    ))}
                  </div>
                </div>
               
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">From</label>
                    <input
                      type="time"
                      value={campaignData?.schedule?.sending_window?.time_range?.[0] || ''}
                      onChange={(e) => setCampaignData(prev => ({
                        ...prev,
                        schedule: {
                          ...prev.schedule,
                          sending_window: {
                            ...prev.schedule.sending_window,
                            time_range: [e.target.value, prev.schedule.sending_window.time_range?.[1] || '']
                          }
                        }
                      }))}
                      disabled={!isEditing}
                      className={`w-full px-2 py-1 border border-gray-300 ${isEditing ? 'bg-white' : 'bg-gray-50'} text-gray-900 text-xs rounded-md focus:ring-2 focus:ring-[#0056D2] focus:border-transparent`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">To</label>
                    <input
                      type="time"
                      value={campaignData?.schedule?.sending_window?.time_range?.[1] || ''}
                      onChange={(e) => setCampaignData(prev => ({
                        ...prev,
                        schedule: {
                          ...prev.schedule,
                          sending_window: {
                            ...prev.schedule.sending_window,
                            time_range: [prev.schedule.sending_window.time_range?.[0] || '', e.target.value]
                          }
                        }
                      }))}
                      disabled={!isEditing}
                      className={`w-full px-2 py-1 border border-gray-300 ${isEditing ? 'bg-white' : 'bg-gray-50'} text-gray-900 text-xs rounded-md focus:ring-2 focus:ring-[#0056D2] focus:border-transparent`}
                    />
                  </div>
                </div>
               
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Daily Send Limit</label>
                  <input
                    type="number"
                    value={campaignData.schedule.daily_send_limit || 0}
                    onChange={(e) => setCampaignData(prev => ({
                      ...prev,
                      schedule: { ...prev.schedule, daily_send_limit: parseInt(e.target.value) || 0 }
                    }))}
                    disabled={!isEditing}
                    className={`w-full px-2 py-1 border border-gray-300 ${isEditing ? 'bg-white' : 'bg-gray-50'} text-gray-900 text-xs rounded-md focus:ring-2 focus:ring-[#0056D2] focus:border-transparent`}
                  />
                </div>
              </div>
            </div>
          )}
 
          {/* Tracking */}
          {campaignData.tracking && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="bg-[#0056D2] px-4 py-3 rounded-t-lg">
                <div className="flex items-center text-white">
                  <Activity className="h-4 w-4 mr-2" />
                  <h2 className="text-xs font-semibold">Tracking Options</h2>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { key: 'open_tracking', label: 'Track Opens' },
                  { key: 'click_tracking', label: 'Track Clicks' },
                  { key: 'intent_classification', label: 'Intent Classification' },
                  { key: 'reply_classification', label: 'Reply Classification' },
                  { key: 'bounce_tracking', label: 'Bounce Tracking' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <span className="text-xs text-gray-700 font-medium">{item.label}</span>
                    <input
                      type="checkbox"
                      checked={campaignData.tracking[item.key] || false}
                      onChange={(e) => setCampaignData(prev => ({
                        ...prev,
                        tracking: { ...prev.tracking, [item.key]: e.target.checked }
                      }))}
                      disabled={!isEditing}
                      className="h-3 w-3 text-[#0056D2] focus:ring-[#0056D2] border-gray-300 rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
 
        {/* Main Content */}
        <div className="flex-1 space-y-6">
         
          {/* Target Audience */}
          {campaignData.target_audience && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="bg-[#0056D2] px-4 py-3 rounded-t-lg">
                <div className="flex items-center text-white">
                  <Target className="h-4 w-4 mr-2" />
                  <h2 className="text-xs font-semibold">Target Audience</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 
                  {/* Industries */}
                  <div>
                    <h3 className="text-xs font-semibold text-gray-900 mb-3">Industries</h3>
                    <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-md p-3 bg-gray-50">
                      {(campaignData.target_audience.industry || []).length > 0 ? (
                        (campaignData.target_audience.industry || []).map((industry, index) => (
                          <div key={index} className="text-xs text-gray-700 py-1 border-b border-gray-100 last:border-b-0">
                            {industry}
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-gray-500 italic">No industries specified</p>
                      )}
                    </div>
                  </div>
 
                  {/* Locations */}
                  <div>
                    <h3 className="text-xs font-semibold text-gray-900 mb-3">Locations</h3>
                    <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-md p-3 bg-gray-50">
                      {(campaignData.target_audience.locations || []).length > 0 ? (
                        (campaignData.target_audience.locations || []).map((location, index) => (
                          <div key={index} className="text-xs text-gray-700 py-1 border-b border-gray-100 last:border-b-0">
                            {location}
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-gray-500 italic">No locations specified</p>
                      )}
                    </div>
                  </div>
 
                  {/* Roles */}
                  <div>
                    <h3 className="text-xs font-semibold text-gray-900 mb-3">Roles</h3>
                    <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-md p-3 bg-gray-50">
                      {(campaignData.target_audience.roles || []).length > 0 ? (
                        (campaignData.target_audience.roles || []).map((role, index) => (
                          <div key={index} className="text-xs text-gray-700 py-1 border-b border-gray-100 last:border-b-0">
                            {role}
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-gray-500 italic">No roles specified</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
 
          {/* Campaign Phases */}
          {campaignData.campaign_phases && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="bg-[#0056D2] px-4 py-3 rounded-t-lg">
                <h2 className="text-xs font-semibold text-white">Campaign Phases</h2>
              </div>
              <div className="p-3 h-[105vh] overflow-y-auto">
                <div className="space-y-6">
                  {campaignData.campaign_phases.map((phase, phaseIndex) => (
                    <div key={phaseIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Phase Name</label>
                            <input
                              type="text"
                              value={phase.name || ''}
                              onChange={(e) => handlePhaseUpdate(phaseIndex, "name", e.target.value)}
                              disabled={!isEditing}
                              className={`w-full px-2 py-1 text-xs border border-gray-300 ${isEditing ? 'bg-white' : 'bg-gray-100'} text-gray-900 rounded-md focus:ring-2 focus:ring-[#0056D2] focus:border-transparent`}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                            <input
                              type="text"
                              value={phase.description || ''}
                              onChange={(e) => handlePhaseUpdate(phaseIndex, "description", e.target.value)}
                              disabled={!isEditing}
                              className={`w-full px-2 py-1 text-xs border border-gray-300 ${isEditing ? 'bg-white' : 'bg-gray-100'} text-gray-900 rounded-md focus:ring-2 focus:ring-[#0056D2] focus:border-transparent`}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Duration (Days)</label>
                            <input
                              type="number"
                              value={phase.duration_days || 0}
                              disabled
                              className="w-full px-2 py-1 text-xs border border-gray-300 bg-gray-100 text-gray-900 rounded-md"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="text-xs font-medium text-gray-900 mb-3">Email Sequence</h4>
                        <div className="space-y-4">
                          {(phase.email_sequence || []).map((email, emailIdx) => (
                            <div key={emailIdx} className="bg-gray-50 border border-gray-200 rounded-md p-4">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-1">Subject Line</label>
                                  <input
                                    type="text"
                                    value={email.subject || ''}
                                    onChange={(e) => updateEmailInPhase(phaseIndex, emailIdx, "subject", e.target.value)}
                                    disabled={!isEditing}
                                    className={`w-full px-2 py-1 text-xs border border-gray-300 ${isEditing ? 'bg-white' : 'bg-gray-100'} text-gray-900 rounded-md focus:ring-2 focus:ring-[#0056D2] focus:border-transparent`}
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-1">Wait Days</label>
                                  <input
                                    type="number"
                                    value={email.wait_days || 0}
                                    disabled
                                    className="w-full px-2 py-1 text-xs border border-gray-300 bg-gray-100 text-gray-900 rounded-md"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
                                  <input
                                    type="text"
                                    value={email.type || ''}
                                    disabled
                                    className="w-full px-2 py-1 text-xs border border-gray-300 bg-gray-100 text-gray-900 rounded-md"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Email Body</label>
                                <textarea
                                  value={email.body || ''}
                                  onChange={(e) => updateEmailInPhase(phaseIndex, emailIdx, "body", e.target.value)}
                                  disabled={!isEditing}
                                  className={`w-full px-2 py-1 text-xs border border-gray-300 ${isEditing ? 'bg-white' : 'bg-gray-100'} text-gray-900 rounded-md focus:ring-2 focus:ring-[#0056D2] focus:border-transparent`}
                                  rows={3}
                                  placeholder="Enter email content..."
                                />
                              </div>
                            </div>
                          ))}
                          {(!phase.email_sequence || phase.email_sequence.length === 0) && (
                            <div className="text-center py-8 text-gray-500">
                              <p className="text-xs">No email sequences defined for this phase</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {(!campaignData.campaign_phases || campaignData.campaign_phases.length === 0) && (
                    <div className="text-center py-12 text-gray-500">
                      <p className="text-xs">No campaign phases configured</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default EmailCampaignSettings;
 