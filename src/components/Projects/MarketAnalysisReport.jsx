"use client"
import React, { useState, useEffect } from 'react';
import { Loader2, Download, FileText } from 'lucide-react';
import { axiosPublic } from '@/app/api/constant';
 
const MarketAnalysisReport = ({execId,curStatus}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    
    const fetchData = async () => {
      
        await axiosPublic.get(`project/sales-report/32`)
        .then(res =>{
            setData(res.data)
        })
        .catch(err =>{
            setError(err.response.data.error || "Error while loading")
        })
        .finally(()=>{
            setLoading(false);
        });
    };
   
        if(curStatus !== "active")
        {
        fetchData();
        }
  }, [curStatus]);
 
  const cleanText = (text) => {
    if (!text) return '';
    return text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/<cite[^>]*\/>/g, '')
      .replace(/<cite[^>]*>.*?<\/cite>/g, '')
      .replace(/###/g, '')
      .replace(/##/g, '')
      .replace(/#/g, '')
      .replace(/---/g, '')
      .trim();
  };
 
  const parseMarketContext = (context) => {
    if (!context) return [];
   
    const sections = context.split(/(?=#{1,3}\s)/);
    return sections.map((section, index) => {
      const lines = section.split('\n').filter(line => line.trim());
      const title = lines[0] ? cleanText(lines[0]) : '';
      const content = lines.slice(1).map(line => cleanText(line)).filter(line => line);
     
      return {
        id: index,
        title,
        content: content.join(' ')
      };
    }).filter(section => section.title);
  };
 
  const formatArrayData = (arr, title) => {
    if (!arr || arr.length === 0) return null;
    return (
      <div className="mb-3">
        <h3 className="text-xs font-semibold text-gray-800 mb-2 pb-1 border-b border-gray-200">{title}</h3>
        <div className="flex flex-wrap gap-1">
          {arr.map((item, index) => (
            <span key={index} className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  };
 
  const downloadAsPDF = () => {
    const sections = parseMarketContext(data.market_context);
   
    // Create a new window for PDF generation
    const printWindow = window.open('', '_blank');
   
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Market Analysis Report</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 40px;
            color: #333;
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 2px solid #0056D2;
            padding-bottom: 20px;
          }
          .header h1 {
            color: #0056D2;
            margin-bottom: 10px;
          }
          .section {
            margin-bottom: 30px;
            page-break-inside: avoid;
          }
          .section-title {
            color: #0056D2;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
            border-left: 4px solid #0056D2;
            padding-left: 10px;
          }
          .section-content {
            text-align: justify;
            line-height: 1.8;
          }
          .data-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 10px;
            margin: 15px 0;
          }
          .data-item {
            background: #f5f5f5;
            padding: 8px;
            border-radius: 4px;
            font-size: 12px;
          }
          @media print {
            body { margin: 20px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Complete Market Analysis Report</h1>
          <p>Generated on ${new Date().toLocaleDateString()}</p>
          <p>Project ID: ${data.project_id}</p>
        </div>
    `;
 
    // Market Context Sections
    sections.forEach(section => {
      htmlContent += `
        <div class="section">
          <div class="section-title">${section.title}</div>
          <div class="section-content">${section.content}</div>
        </div>
      `;
    });
 
    // Prospect Research Data
    if (data.prospect_research) {
      const pr = data.prospect_research;
     
      htmlContent += `
        <div class="section">
          <div class="section-title">Target Market Research Data</div>
      `;
 
      if (pr.organization_locations) {
        htmlContent += `
          <h3>Target Locations</h3>
          <div class="data-grid">
            ${pr.organization_locations.map(loc => `<div class="data-item">${loc}</div>`).join('')}
          </div>
        `;
      }
 
      if (pr.organization_industry_tag_ids) {
        htmlContent += `
          <h3>Target Industries</h3>
          <div class="data-grid">
            ${pr.organization_industry_tag_ids.map(industry => `<div class="data-item">${industry}</div>`).join('')}
          </div>
        `;
      }
 
      if (pr.person_titles) {
        htmlContent += `
          <h3>Target Job Titles</h3>
          <div class="data-grid">
            ${pr.person_titles.map(title => `<div class="data-item">${title}</div>`).join('')}
          </div>
        `;
      }
 
      if (pr.person_departments) {
        htmlContent += `
          <h3>Target Departments</h3>
          <div class="data-grid">
            ${pr.person_departments.map(dept => `<div class="data-item">${dept}</div>`).join('')}
          </div>
        `;
      }
 
      if (pr.person_skills) {
        htmlContent += `
          <h3>Relevant Skills</h3>
          <div class="data-grid">
            ${pr.person_skills.map(skill => `<div class="data-item">${skill}</div>`).join('')}
          </div>
        `;
      }
 
      if (pr.organization_technologies) {
        htmlContent += `
          <h3>Technologies Used</h3>
          <div class="data-grid">
            ${pr.organization_technologies.map(tech => `<div class="data-item">${tech}</div>`).join('')}
          </div>
        `;
      }
 
      if (pr.organization_keywords) {
        htmlContent += `
          <h3>Organization Keywords</h3>
          <div class="data-grid">
            ${pr.organization_keywords.map(keyword => `<div class="data-item">${keyword}</div>`).join('')}
          </div>
        `;
      }
 
      if (pr.person_keywords) {
        htmlContent += `
          <h3>Person Keywords</h3>
          <div class="data-grid">
            ${pr.person_keywords.map(keyword => `<div class="data-item">${keyword}</div>`).join('')}
          </div>
        `;
      }
 
      htmlContent += `</div>`;
    }
 
    htmlContent += `
      </body>
      </html>
    `;
 
    printWindow.document.write(htmlContent);
    printWindow.document.close();
   
    // Wait for content to load, then trigger print
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };


  if(curStatus === "active"){
    return (
      <div className="h-52 bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-sm">
          <p className="text-gray-600">Please wait while we are generating market research...</p>
        </div>
      </div>
    );
  }
 
  if (loading) {
    return (
      <div className="h-52 bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-sm">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading market analysis...</p>
        </div>
      </div>
    );
  }
 
  if (error) {
    return (
      <div className="h-52 bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white border border-red-200 rounded-lg max-w-md shadow-sm">
          <h2 className="font-semibold text-red-800 mb-2">Error Loading Data</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  
 
  if (!data || !data.market_context) {
    return (
      <div className="h-52 bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-sm">
          <p className="text-gray-600">No market data available</p>
        </div>
      </div>
    );
  }
 
  const sections = parseMarketContext(data.market_context);
 
  return (
    <div className="max-h-screen overflow-auto bg-gray-50">
      {/* Article Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 text-blue-600 mb-2">
              <FileText size={16} />
              <span className="text-xs font-medium uppercase tracking-wide">Market Research Report</span>
            </div>
            <h1 className="text-sm font-bold text-gray-900 mb-2 leading-tight">
              Complete Market Analysis Report
            </h1>
            {/* <div className="flex items-center justify-center space-x-4 text-gray-600 mb-3">
              <div className="flex items-center space-x-1">
                <Calendar size={14} />
                <span className="text-xs">Generated on {new Date().toLocaleDateString()}</span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-xs">Project ID: {data.project_id}</span>
            </div> */}
            <button
              onClick={downloadAsPDF}
              className="inline-flex items-center space-x-2 px-2 py-1 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Download size={14} />
              <span className="text-xs font-medium">Download</span>
            </button>
          </div>
        </div>
      </div>
 
      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <article className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4">
            {/* Market Context Sections */}
            <div className="prose prose-sm max-w-none">
              {sections.map((section, index) => (
                <section key={section.id} className="mb-4">
                  <h2 className="text-sm font-bold text-gray-900 mb-2 pb-1 border-b-2 border-blue-100">
                    {section.title}
                  </h2>
                  <div className="text-gray-700 leading-relaxed text-xs">
                    <p className="text-justify">{section.content}</p>
                  </div>
                </section>
              ))}
            </div>
 
            {/* Divider */}
            <div className="my-4 border-t border-gray-200"></div>
 
            {/* Target Market Research Data */}
            {data.prospect_research && (
              <section>
                <h2 className="text-sm font-bold text-gray-900 mb-4 pb-1 border-b-2 border-blue-100">
                  Target Market Research Data
                </h2>
               
                <div className="space-y-4">
                  {formatArrayData(data.prospect_research.organization_locations, "Target Locations")}
                  {formatArrayData(data.prospect_research.organization_industry_tag_ids, "Target Industries")}
                  {formatArrayData(data.prospect_research.person_titles, "Target Job Titles")}
                  {formatArrayData(data.prospect_research.person_departments, "Target Departments")}
                  {formatArrayData(data.prospect_research.person_seniorities, "Target Seniorities")}
                  {formatArrayData(data.prospect_research.organization_num_employees_ranges, "Company Size Ranges")}
                  {formatArrayData(data.prospect_research.person_skills, "Relevant Skills")}
                  {formatArrayData(data.prospect_research.organization_technologies, "Technologies Used")}
                  {formatArrayData(data.prospect_research.organization_keywords, "Organization Keywords")}
                  {formatArrayData(data.prospect_research.person_keywords, "Person Keywords")}
                  {formatArrayData(data.prospect_research.person_not_titles, "Excluded Job Titles")}
                  {formatArrayData(data.prospect_research.person_not_keywords, "Excluded Person Keywords")}
                </div>
              </section>
            )}
          </div>
        </article>
 
        {/* Footer */}
        <div className="mt-4 text-center text-gray-500 text-xs">
          <p>This report was automatically generated based on market research data and analysis.</p>
        </div>
      </div>
    </div>
  );
};
 
export default MarketAnalysisReport;
 