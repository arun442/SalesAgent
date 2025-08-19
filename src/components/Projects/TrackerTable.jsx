import React, { useState, useEffect } from 'react';
import { User, Mail, Send, Eye, MousePointer, MessageCircle, Calendar, Search, Filter, Activity } from 'lucide-react';
import { axiosPublic } from '@/app/api/constant';
import {data} from './trackerdata';

const CampaignTrackersDashboard = ({ execId,curStatus }) => {
  const [campaignData, setCampaignData] = useState(null);
  const [trackers, setTrackers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  useEffect(() => {
    fetchCampaignData();
  }, [execId]);

  const fetchCampaignData = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await axiosPublic.get(`v1/campaign-leads/tracker/${execId}`);
      const data = response.data;
      setCampaignData(data.campaign);
      setTrackers(data.trackers || []);
    } catch (err) {
      setError(err.response?.data?.error || "Error while fetching campaign data");
    } finally {
      setLoading(false);
    }
  };

  const filteredTrackers = trackers.filter(tracker => {
    const matchesSearch =
      tracker.lead_info?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tracker.lead_info?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tracker.lead_info?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tracker.campaignId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tracker.status?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterBy === 'all' ||
      (filterBy === 'sent' && tracker.status === 'sent') ||
      (filterBy === 'pending' && tracker.status === 'pending') ||
      (filterBy === 'opened' && parseInt(tracker.open_count) > 0) ||
      (filterBy === 'clicked' && parseInt(tracker.click_count) > 0) ||
      (filterBy === 'replied' && parseInt(tracker.reply_count) > 0);

    return matchesSearch && matchesFilter;
  });

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'sent':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="h-52 bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0056D2] mx-auto"></div>
          <p className="text-sm text-black mt-2">Loading campaign data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-52 bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-red-500">Error: {error}</p>
          <button
            onClick={fetchCampaignData}
            className="mt-2 px-3 py-1 bg-[#0056D2] text-white text-sm rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3">
      {/* Campaign Header */}
      {campaignData && (
        <div className="bg-white rounded border p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg font-semibold text-black flex items-center">
              <Activity className="h-5 w-5 text-[#0056D2] mr-2" />
              {campaignData.campaign_name}
            </h1>
            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
              campaignData.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {campaignData.status}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            <p>Campaign ID: {campaignData.campaign_id}</p>
            <p>Execution ID: {campaignData.execution_id}</p>
          </div>
        </div>
      )}

      {/* Dashboard Header */}
      <div className="mb-3">
        <div className='flex justify-between'>
          <h1 className="text-sm text-black mb-3">Campaign Trackers Dashboard</h1>
          <h1 className='text-xs text-black'>Total Trackers: {trackers.length}</h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mb-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 h-3 w-3" />
            <input
              type="text"
              placeholder="Search trackers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-black pl-7 pr-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]"
            />
          </div>
         
          {/* Filter */}
          <div className="relative">
            <Filter className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 h-3 w-3" />
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="pl-7 text-black pr-6 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2] bg-white"
            >
              <option value="all">All Trackers</option>
              <option value="sent">Sent</option>
              <option value="pending">Pending</option>
              <option value="opened">Opened</option>
              <option value="clicked">Clicked</option>
              <option value="replied">Replied</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table with fixed height and scroll */}
      {filteredTrackers.length === 0 ? (
        <div className="bg-white rounded border p-4 text-center">
          <p className="text-xs text-gray-500">No trackers found matching your criteria</p>
        </div>
      ) : (
        <div className="bg-white rounded border overflow-hidden h-[75vh]">
          <div className="overflow-auto h-full">
            <table className="w-full">
              <thead className="bg-gray-50 border-b sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Phase/Seq</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Opens</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Clicks</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Replies</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Updated</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTrackers.map((tracker, index) => (
                  <tr key={tracker.tracker_id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-[#0056D2] rounded-full flex items-center justify-center mr-2">
                          <User className="h-3 w-3 text-white" />
                        </div>
                        <div className="text-xs font-medium text-gray-900">
                          {tracker.lead_info?.first_name} {tracker.lead_info?.last_name}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      {tracker.lead_info?.email ? (
                        <div className="flex items-center">
                          <Mail className="h-3 w-3 text-[#0056D2] mr-1" />
                          <div className="text-xs text-gray-900 truncate max-w-[150px]" title={tracker.lead_info.email}>
                            {tracker.lead_info.email}
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <span className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded ${getStatusBadgeColor(tracker.status)}`}>
                        {tracker.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <Send className="h-3 w-3 text-[#0056D2] mr-1" />
                        <div className="text-xs text-gray-900">{tracker.trackerType}</div>
                      </div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <div className="text-xs text-gray-900">
                        {tracker.phaseId} / {tracker.seqId}
                      </div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center">
                        <Eye className="h-3 w-3 text-[#0056D2] mr-1" />
                        <span className="text-xs font-medium text-gray-900">{tracker.open_count}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center">
                        <MousePointer className="h-3 w-3 text-[#0056D2] mr-1" />
                        <span className="text-xs font-medium text-gray-900">{tracker.click_count}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center">
                        <MessageCircle className="h-3 w-3 text-[#0056D2] mr-1" />
                        <span className="text-xs font-medium text-gray-900">{tracker.reply_count}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 text-[#0056D2] mr-1" />
                        <div className="text-xs text-gray-900">{formatDate(tracker.created_at)}</div>
                      </div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 text-[#0056D2] mr-1" />
                        <div className="text-xs text-gray-900">{formatDate(tracker.updated_at)}</div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignTrackersDashboard;