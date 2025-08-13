import React, { useState, useEffect } from 'react';
import { User, Mail, MapPin, Building, Calendar, ExternalLink, Search, Filter } from 'lucide-react';
 
const LeadsDashboard = ({execId}) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
 
  useEffect(() => {
    fetchLeads();
  }, []);
 
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://stu.globalknowledgetech.com:8444/api/leads/execution/${execId}`, {
        method: "GET", // Explicitly set to GET
        headers: {
          'Content-Type': 'application/json',
        },
      });
     
      if (!response.ok) {
        throw new Error('Failed to fetch leads');
      }
     
      const result = await response.json();
     
      // Extract data array from the API response
      const leadsData = result.data || result;
      setLeads(leadsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
 
  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.organization_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase());
 
    const matchesFilter =
      filterBy === 'all' ||
      (filterBy === 'with_email' && lead.email) ||
      (filterBy === 'without_email' && !lead.email) ||
      (filterBy === 'email_sent' && lead.email_sent) ||
      (filterBy === 'email_not_sent' && !lead.email_sent);
 
    return matchesSearch && matchesFilter;
  });
 
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
 
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0056D2] mx-auto"></div>
          <p className="text-sm text-black mt-2">Loading leads...</p>
        </div>
      </div>
    );
  }
 
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-red-500">Error: {error}</p>
          <button
            onClick={fetchLeads}
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
      {/* Header */}
      <div className="mb-3">
        <div className='flex justify-between'>
          <h1 className="text-sm text-black mb-3">Sales Leads Dashboard</h1>
          <h1 className='text-xs text-black'>Total Leads: {leads.length}</h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mb-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 h-3 w-3" />
            <input
              type="text"
              placeholder="Search leads..."
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
              <option value="all">All Leads</option>
              <option value="with_email">With Email</option>
              <option value="without_email">Without Email</option>
              <option value="email_sent">Email Sent</option>
              <option value="email_not_sent">Email Not Sent</option>
            </select>
          </div>
        </div>
      </div>
 
      {/* Table with fixed height and scroll */}
      {filteredLeads.length === 0 ? (
        <div className="bg-white rounded border p-4 text-center">
          <p className="text-xs text-gray-500">No leads found matching your criteria</p>
        </div>
      ) : (
        <div className="bg-white rounded border overflow-hidden h-[80vh]">
          <div className="overflow-auto h-full">
            <table className="w-full">
              <thead className="bg-gray-50 border-b sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Seniority</th>
                  {/* <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Created</th> */}
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.map((lead, index) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-[#0056D2] rounded-full flex items-center justify-center mr-2">
                          <User className="h-3 w-3 text-white" />
                        </div>
                        <div className="text-xs font-medium text-gray-900">
                          {lead.first_name} {lead.last_name}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <div className="text-xs whitespace-nowrap text-gray-900">{lead.title || '-'}</div>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center">
                        <Building className="h-3 w-3 text-[#0056D2] mr-1" />
                        <div className="text-xs whitespace-nowrap text-gray-900">{lead.organization_name || '-'}</div>
                      </div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {(lead.city || lead.country) ? (
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 text-[#0056D2] mr-1" />
                          <div className="text-xs text-gray-900">
                            {lead.city}{lead.city && lead.country ? ', ' : ''}{lead.country}
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      {lead.email ? (
                        <div className="flex items-center">
                          <Mail className="h-3 w-3 text-[#0056D2] mr-1" />
                          <div className="text-xs text-gray-900 truncate max-w-[150px]" title={lead.email}>
                            {lead.email}
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <div className="text-xs text-gray-900">{lead.phone_number || '-'}</div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {lead.seniority ? (
                        <span className="inline-flex px-1.5 py-0.5 text-xs font-medium rounded bg-blue-100 text-blue-800">
                          {lead.seniority}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </td>
                    {/* <td className="px-3 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 text-[#0056D2] mr-1" />
                        <div className="text-xs text-gray-900">{formatDate(lead.created_at)}</div>
                      </div>
                    </td> */}
                    <td className="px-3 py-2 whitespace-nowrap">
                      {lead.linkedin_url && (
                        <a
                          href={lead.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-2 py-1 border border-[#0056D2] text-[#0056D2] hover:bg-[#0056D2] hover:text-white text-xs rounded transition-colors"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          LinkedIn
                        </a>
                      )}
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
 
export default LeadsDashboard;
 