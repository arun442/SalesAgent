// "use client"
// import React, { useState, useEffect } from 'react';
// import { Loader2, Download, FileText } from 'lucide-react';
// import { axiosPublic } from '@/app/api/constant';
// import axios from 'axios';

// const MarketAnalysisReport = ({ execId, curStatus }) => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [randomText, setRandomText] = useState('');

//     const textData = ["AIA analyzes your target market 50x faster than traditional research methods.",
//         "Get competitor insights that would take weeks to gather manually - in minutes.",
//         "AIA identifies untapped market opportunities your competitors are missing.",
//         "Build your ideal customer profile with AI-powered demographic analysis.",
//         "Discover trending topics and seasonal opportunities to maximize campaign impact.",
//         "AIA creates personalized outreach messages that boost response rates by 40%.",
//         "Generate campaign strategies tailored to your specific industry and audience.",
//         "Automate lead scoring to focus your team on the highest-converting prospects.",
//         "AIA scrapes and enriches leads from multiple platforms simultaneously.",
//         "Get market forecasts and trends to stay ahead of the competition.",
//         "Generate professional content for email, SMS, and social media campaigns.",
//         "AIA handles objections and follow-ups, freeing your team for closing deals.",
//         "Track lead behavior across all touchpoints for smarter nurturing strategies.",
//         "Reduce campaign setup time from days to minutes with AI automation.",
//         "AIA ensures TRAI compliance for all your SMS marketing campaigns.",
//         "Get instant SWOT analysis of your business and market position.",
//         "Multi-channel outreach coordination increases lead conversion by 60%.",
//         "AIA generates quotations and proforma invoices automatically.",
//         "Scale your outreach without scaling your team - AIA works 24/7.",
//         "Transform marketing guesswork into data-driven, profitable campaigns."]


//     useEffect(() => {
//         let id;
//         id = setInterval(() => {
//             const randomIndex = Math.floor(Math.random() * textData.length - 1) + 1;
//             setRandomText(textData[randomIndex]);
//         }, 5000);

//         return (() => clearInterval(id));
//     }, []);
//     useEffect(() => {

//         const fetchData = async () => {

//             await axiosPublic.get(`project/sales-report/${execId}`)
//                 // await axios.post(`https://gkcsaia.app.n8n.cloud/webhook/research`,{
//                 //   "ececution_id": execId
//                 // })
//                 .then(res => {
//                     setData(res.data)
//                 })
//                 .catch(err => {
//                     setError(err.response.data.error || "Error while loading")
//                 })
//                 .finally(() => {
//                     setLoading(false);
//                 });
//         };

//         if (curStatus !== "active") {
//             fetchData();
//         }
//     }, [curStatus]);

//     const cleanText = (text) => {
//         if (!text) return '';
//         return text
//             .replace(/\*\*/g, '')
//             .replace(/\*/g, '')
//             .replace(/<cite[^>]*\/>/g, '')
//             .replace(/<cite[^>]*>.*?<\/cite>/g, '')
//             .replace(/###/g, '')
//             .replace(/##/g, '')
//             .replace(/#/g, '')
//             .replace(/---/g, '')
//             .trim();
//     };

//     const parseMarketContext = (context) => {
//         if (!context) return [];

//         const sections = context.split(/(?=#{1,3}\s)/);
//         return sections.map((section, index) => {
//             const lines = section.split('\n').filter(line => line.trim());
//             const title = lines[0] ? cleanText(lines[0]) : '';
//             const content = lines.slice(1).map(line => cleanText(line)).filter(line => line);

//             return {
//                 id: index,
//                 title,
//                 content: content.join(' ')
//             };
//         }).filter(section => section.title);
//     };

//     const formatArrayData = (arr, title) => {
//         if (!arr || arr.length === 0) return null;
//         return (
//             <div className="mb-3">
//                 <h3 className="text-xs font-semibold text-gray-800 mb-2 pb-1 border-b border-gray-200">{title}</h3>
//                 <div className="flex flex-wrap gap-1">
//                     {arr.map((item, index) => (
//                         <span key={index} className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
//                             {item}
//                         </span>
//                     ))}
//                 </div>
//             </div>
//         );
//     };

//     const downloadAsPDF = () => {
//         const sections = parseMarketContext(data.market_segment);

//         // Create a new window for PDF generation
//         const printWindow = window.open('', '_blank');

//         let htmlContent = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>Market Analysis Report</title>
//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             line-height: 1.6;
//             margin: 40px;
//             color: #333;
//           }
//           .header {
//             text-align: center;
//             margin-bottom: 40px;
//             border-bottom: 2px solid #0056D2;
//             padding-bottom: 20px;
//           }
//           .header h1 {
//             color: #0056D2;
//             margin-bottom: 10px;
//           }
//           .section {
//             margin-bottom: 30px;
//             page-break-inside: avoid;
//           }
//           .section-title {
//             color: #0056D2;
//             font-size: 18px;
//             font-weight: bold;
//             margin-bottom: 15px;
//             border-left: 4px solid #0056D2;
//             padding-left: 10px;
//           }
//           .section-content {
//             text-align: justify;
//             line-height: 1.8;
//           }
//           .data-grid {
//             display: grid;
//             grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
//             gap: 10px;
//             margin: 15px 0;
//           }
//           .data-item {
//             background: #f5f5f5;
//             padding: 8px;
//             border-radius: 4px;
//             font-size: 12px;
//           }
//           @media print {
//             body { margin: 20px; }
//             .no-print { display: none; }
//           }
//         </style>
//       </head>
//       <body>
//         <div class="header">
//           <h1>Complete Market Analysis Report</h1>
//           <p>Generated on ${new Date().toLocaleDateString()}</p>
//           <p>Project ID: ${data.project_id}</p>
//         </div>
//     `;

//         // Market Context Sections
//         sections.forEach(section => {
//             htmlContent += `
//         <div class="section">
//           <div class="section-title">${section.title}</div>
//           <div class="section-content">${section.content}</div>
//         </div>
//       `;
//         });

//         // Prospect Research Data
//         if (data.prospect_research) {
//             const pr = data.prospect_research;

//             htmlContent += `
//         <div class="section">
//           <div class="section-title">Target Market Research Data</div>
//       `;

//             if (pr.organization_locations) {
//                 htmlContent += `
//           <h3>Target Locations</h3>
//           <div class="data-grid">
//             ${pr.organization_locations.map(loc => `<div class="data-item">${loc}</div>`).join('')}
//           </div>
//         `;
//             }

//             if (pr.organization_industry_tag_ids) {
//                 htmlContent += `
//           <h3>Target Industries</h3>
//           <div class="data-grid">
//             ${pr.organization_industry_tag_ids.map(industry => `<div class="data-item">${industry}</div>`).join('')}
//           </div>
//         `;
//             }

//             if (pr.person_titles) {
//                 htmlContent += `
//           <h3>Target Job Titles</h3>
//           <div class="data-grid">
//             ${pr.person_titles.map(title => `<div class="data-item">${title}</div>`).join('')}
//           </div>
//         `;
//             }

//             if (pr.person_departments) {
//                 htmlContent += `
//           <h3>Target Departments</h3>
//           <div class="data-grid">
//             ${pr.person_departments.map(dept => `<div class="data-item">${dept}</div>`).join('')}
//           </div>
//         `;
//             }

//             if (pr.person_skills) {
//                 htmlContent += `
//           <h3>Relevant Skills</h3>
//           <div class="data-grid">
//             ${pr.person_skills.map(skill => `<div class="data-item">${skill}</div>`).join('')}
//           </div>
//         `;
//             }

//             if (pr.organization_technologies) {
//                 htmlContent += `
//           <h3>Technologies Used</h3>
//           <div class="data-grid">
//             ${pr.organization_technologies.map(tech => `<div class="data-item">${tech}</div>`).join('')}
//           </div>
//         `;
//             }

//             if (pr.organization_keywords) {
//                 htmlContent += `
//           <h3>Organization Keywords</h3>
//           <div class="data-grid">
//             ${pr.organization_keywords.map(keyword => `<div class="data-item">${keyword}</div>`).join('')}
//           </div>
//         `;
//             }

//             if (pr.person_keywords) {
//                 htmlContent += `
//           <h3>Person Keywords</h3>
//           <div class="data-grid">
//             ${pr.person_keywords.map(keyword => `<div class="data-item">${keyword}</div>`).join('')}
//           </div>
//         `;
//             }

//             htmlContent += `</div>`;
//         }

//         htmlContent += `
//       </body>
//       </html>
//     `;

//         printWindow.document.write(htmlContent);
//         printWindow.document.close();

//         // Wait for content to load, then trigger print
//         setTimeout(() => {
//             printWindow.print();
//         }, 250);
//     };


//     if (curStatus === "active") {
//         return (
//             <div className="h-52 bg-gray-50 flex items-center justify-center">
//                 <div className="text-center p-8 bg-white rounded-lg shadow-sm">
//                     <p className="text-gray-600">{randomText}</p>
//                 </div>
//             </div>
//         );
//     }

//     if (loading) {
//         return (
//             <div className="h-52 bg-gray-50 flex items-center justify-center">
//                 <div className="text-center bg-white p-8 rounded-lg shadow-sm">
//                     <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
//                     <p className="text-gray-600 font-medium">Loading market analysis...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="h-52 bg-gray-50 flex items-center justify-center">
//                 <div className="text-center p-8 bg-white border border-red-200 rounded-lg max-w-md shadow-sm">
//                     <h2 className="font-semibold text-red-800 mb-2">Error Loading Data</h2>
//                     <p className="text-red-600 mb-4">{error}</p>
//                     <button
//                         onClick={() => window.location.reload()}
//                         className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                     >
//                         Retry
//                     </button>
//                 </div>
//             </div>
//         );
//     }



//     //   if (!data || !data.market_context) {
//     //     return (
//     //       <div className="h-52 bg-gray-50 flex items-center justify-center">
//     //         <div className="text-center p-8 bg-white rounded-lg shadow-sm">
//     //           <p className="text-gray-600">No market data available</p>
//     //         </div>
//     //       </div>
//     //     );
//     //   }

//     const sections = parseMarketContext(data.market_segment);
//     const client_section = parseMarketContext(data?.client_org_research || '');
//     const prospect_Section = parseMarketContext(data?.prospect_research || '');
//     return (
//         <div className="max-h-screen overflow-auto bg-gray-50">
//             {/* Article Header */}
//             <div className="bg-white shadow-sm border-b">
//                 <div className="max-w-4xl mx-auto px-4 py-4">
//                     <div className="text-center">
//                         <div className="flex items-center justify-center space-x-2 text-blue-600 mb-2">
//                             <FileText size={16} />
//                             <span className="text-xs font-medium uppercase tracking-wide">Market Research Report</span>
//                         </div>
//                         <h1 className="text-sm font-bold text-gray-900 mb-2 leading-tight">
//                             Complete Market Analysis Report
//                         </h1>
//                         {/* <div className="flex items-center justify-center space-x-4 text-gray-600 mb-3">
//               <div className="flex items-center space-x-1">
//                 <Calendar size={14} />
//                 <span className="text-xs">Generated on {new Date().toLocaleDateString()}</span>
//               </div>
//               <span className="text-gray-400">•</span>
//               <span className="text-xs">Project ID: {data.project_id}</span>
//             </div> */}
//                         <button
//                             onClick={downloadAsPDF}
//                             className="inline-flex items-center space-x-2 px-2 py-1 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
//                         >
//                             <Download size={14} />
//                             <span className="text-xs font-medium">Download</span>
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Article Content */}
//             <div className="max-w-4xl mx-auto px-4 py-4">
//                 <article className="bg-white rounded-xl shadow-sm overflow-hidden">
//                     <div className="p-4">
//                         {/* Market Context Sections */}
//                         <div className="prose prose-sm max-w-none">
//                             {sections.map((section, index) => (
//                                 <section key={section.id} className="mb-4">
//                                     <h2 className="text-sm font-bold text-gray-900 mb-2 pb-1 border-b-2 border-blue-100">
//                                         {section.title}
//                                     </h2>
//                                     <div className="text-gray-700 leading-relaxed text-xs">
//                                         <p className="text-justify">{section.content}</p>
//                                     </div>
//                                 </section>
//                             ))}
//                         </div>

//                         <div className="my-4 border-t border-gray-200"></div>
//                             {data.client_org_research &&
//                         <div className="prose prose-sm max-w-none">
//                             <h2 className="text-sm font-bold text-gray-900 mb-4 pb-1 border-b-2 border-blue-100">
//                                     Client Research Data
//                                 </h2>
//                             {client_section.map((section, index) => (
//                                 <section key={section.id} className="mb-4">
//                                     <h2 className="text-sm font-bold text-gray-900 mb-2 pb-1 border-b-2 border-blue-100">
//                                         {section.title}
//                                     </h2>
//                                     <div className="text-gray-700 leading-relaxed text-xs">
//                                         <p className="text-justify">{section.content}</p>
//                                     </div>
//                                 </section>
//                             ))}
//                         </div>
                        
// }
// <div className="my-4 border-t border-gray-200"></div>
//                         {data.prospect_research &&
//                         <div className="prose prose-sm max-w-none">
//                             <h2 className="text-sm font-bold text-gray-900 mb-4 pb-1 border-b-2 border-blue-100">
//                                     Prospect Research Data
//                                 </h2>
//                             {prospect_Section.map((section, index) => (
//                                 <section key={section.id} className="mb-4">
//                                     <h2 className="text-sm font-bold text-gray-900 mb-2 pb-1 border-b-2 border-blue-100">
//                                         {section.title}
//                                     </h2>
//                                     <div className="text-gray-700 leading-relaxed text-xs">
//                                         <p className="text-justify">{section.content}</p>
//                                     </div>
//                                 </section>
//                             ))}

//                         </div>
// }
//                         {/* Divider */}
//                         <div className="my-4 border-t border-gray-200"></div>

//                         {/* Target Market Research Data */}
//                         {/* {data.prospect_research && (
//                             <section>
//                                 <h2 className="text-sm font-bold text-gray-900 mb-4 pb-1 border-b-2 border-blue-100">
//                                     Target Market Research Data
//                                 </h2>

//                                 <div className="space-y-4">
//                                     {formatArrayData(data.prospect_research.organization_locations, "Target Locations")}
//                                     {formatArrayData(data.prospect_research.organization_industry_tag_ids, "Target Industries")}
//                                     {formatArrayData(data.prospect_research.person_titles, "Target Job Titles")}
//                                     {formatArrayData(data.prospect_research.person_departments, "Target Departments")}
//                                     {formatArrayData(data.prospect_research.person_seniorities, "Target Seniorities")}
//                                     {formatArrayData(data.prospect_research.organization_num_employees_ranges, "Company Size Ranges")}
//                                     {formatArrayData(data.prospect_research.person_skills, "Relevant Skills")}
//                                     {formatArrayData(data.prospect_research.organization_technologies, "Technologies Used")}
//                                     {formatArrayData(data.prospect_research.organization_keywords, "Organization Keywords")}
//                                     {formatArrayData(data.prospect_research.person_keywords, "Person Keywords")}
//                                     {formatArrayData(data.prospect_research.person_not_titles, "Excluded Job Titles")}
//                                     {formatArrayData(data.prospect_research.person_not_keywords, "Excluded Person Keywords")}
//                                 </div>
//                             </section>
//                         )} */}
//                     </div>
//                 </article>

//                 {/* Footer */}
//                 <div className="mt-4 text-center text-gray-500 text-xs">
//                     <p>This report was automatically generated based on market research data and analysis.</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MarketAnalysisReport;


"use client"
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Loader2, Download, FileText } from 'lucide-react';
 
const MarketAnalysisReport = ({ execId, curStatus }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://stu.globalknowledgetech.com:8444/project/sales-report/${execId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
 
  const parseMarketContext = (context) => {
    if (!context) return [];
    // Split by markdown headers
    const sections = context.split(/(?=#{1,3}\s)/);
    const parsedSections = sections.map((section, index) => {
      const trimmedSection = section.trim();
      if (!trimmedSection) return null;
      // Extract title from the first line
      const lines = trimmedSection.split('\n');
      const titleLine = lines[0];
      const content = lines.slice(1).join('\n').trim();
      // Clean title by removing markdown symbols
      const title = titleLine.replace(/^#{1,3}\s*/, '').trim();
      return {
        id: index,
        title,
        content,
        fullMarkdown: trimmedSection
      };
    }).filter(section => section && section.title);
    // Limit to only 3 segments
    return parsedSections.slice(0, 3);
  };
 
  const parseClientOrgResearch = (research) => {
    if (!research) return [];
    // Split by markdown headers
    const sections = research.split(/(?=#{1,3}\s)/);
    const parsedSections = sections.map((section, index) => {
      const trimmedSection = section.trim();
      if (!trimmedSection) return null;
      // Extract title from the first line
      const lines = trimmedSection.split('\n');
      const titleLine = lines[0];
      const content = lines.slice(1).join('\n').trim();
      // Clean title by removing markdown symbols
      const title = titleLine.replace(/^#{1,3}\s*/, '').trim();
      return {
        id: index,
        title,
        content,
        fullMarkdown: trimmedSection
      };
    }).filter(section => section && section.title);
    return parsedSections;
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
 
  const parseProspectResearch = (research) => {
    if (!research) return null;
    try {
      return typeof research === 'string' ? JSON.parse(research) : research;
    } catch (error) {
      console.error('Error parsing prospect research:', error);
      return null;
    }
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
          <h1>Complete Market Analysis Report (Top 3 Segments)</h1>
          <p>Generated on ${new Date().toLocaleDateString()}</p>
          <p>Project ID: ${data.project_id}</p>
        </div>
    `;
    // Market Context Sections (limited to 3)
    sections.forEach(section => {
      htmlContent += `
        <div class="section">
          <div class="section-title">${section.title}</div>
          <div class="section-content">${section.content.replace(/\n/g, '<br>')}</div>
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
  // Custom components for ReactMarkdown
  const markdownComponents = {
    h1: ({ children }) => (
      <h1 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b-2 border-blue-200">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-base font-bold text-gray-900 mb-2 pb-1 border-b border-blue-100">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-sm font-semibold text-gray-800 mb-2">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-xs text-gray-700 leading-relaxed mb-3 text-justify">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="text-xs text-gray-700 mb-3 ml-4 space-y-1">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="text-xs text-gray-700 mb-3 ml-4 space-y-1">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed">
        {children}
      </li>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic text-gray-800">
        {children}
      </em>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-200 pl-4 my-3 text-xs text-gray-600 italic">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-gray-100 p-3 rounded text-xs font-mono overflow-x-auto mb-3">
        {children}
      </pre>
    )
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-sm">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading market analysis...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
  if (!data || (!data.market_context && !data.client_org_research && !data.market_segment)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-sm">
          <p className="text-gray-600">No market data available</p>
        </div>
      </div>
    );
  }
  const sections = parseMarketContext(data.market_context);
  const clientOrgSections = parseClientOrgResearch(data.client_org_research);
  const prospectData = parseProspectResearch(data.prospect_research);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Article Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 text-blue-600 mb-2">
              <FileText size={16} />
              <span className="text-xs font-medium uppercase tracking-wide">Market Research Report</span>
            </div>
            <h1 className="text-sm font-bold text-gray-900 mb-2 leading-tight">
              Market Analysis Report - Top 3 Key Segments
            </h1>
            <div className="mb-3">
              <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                Report Generated • {sections.length + clientOrgSections.length} sections
              </span>
            </div>
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
            {sections.length > 0 && (
              <div className="mb-6">
                <h2 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-200 text-blue-800">
                  🎯 Market Context Analysis
                </h2>
                {sections.map((section, index) => (
                  <section key={section.id} className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[24px] h-6 flex items-center justify-center">
                        {index + 1}
                      </span>
                      <h3 className="text-sm font-bold text-gray-900 pb-1 border-b border-blue-100 flex-1">
                        {section.title}
                      </h3>
                    </div>
                    <div className="ml-8">
                      <ReactMarkdown components={markdownComponents}>
                        {section.content}
                      </ReactMarkdown>
                    </div>
                  </section>
                ))}
              </div>
            )}

            {/* Market Segment Analysis */}
            {data.market_segment && (
              <div className="mb-6">
                <h2 className="text-base font-bold  mb-4 pb-2 border-b-2 border-purple-200 text-purple-800">
                  📈 Market Segmentation
                </h2>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <ReactMarkdown components={markdownComponents}>
                    {data.market_segment}
                  </ReactMarkdown>
                </div>
              </div>
            )}

             {/* Target Market Research Data */}
            {prospectData && (
              <section>
                <h2 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b-2 border-orange-200 text-orange-800">
                  🔍 Target Market Research Data
                </h2>                
                <div className="space-y-4">
                  {formatArrayData(prospectData.organization_locations, "Target Locations")}
                  {formatArrayData(prospectData.organization_industry_tag_ids, "Target Industries")}
                  {formatArrayData(prospectData.person_titles, "Target Job Titles")}
                  {formatArrayData(prospectData.person_departments, "Target Departments")}
                  {formatArrayData(prospectData.person_seniorities, "Target Seniorities")}
                  {formatArrayData(prospectData.organization_num_employees_ranges, "Company Size Ranges")}
                  {formatArrayData(prospectData.person_skills, "Relevant Skills")}
                  {formatArrayData(prospectData.organization_technologies, "Technologies Used")}
                  {formatArrayData(prospectData.organization_keywords, "Organization Keywords")}
                  {formatArrayData(prospectData.person_keywords, "Person Keywords")}
                  {formatArrayData(prospectData.person_not_titles, "Excluded Job Titles")}
                  {formatArrayData(prospectData.person_not_keywords, "Excluded Person Keywords")}
                </div>
              </section>
            )}

             {/* Divider */}
            <div className="my-4 border-t border-gray-200"></div>
            {/* Client Organization Research */}
            {clientOrgSections.length > 0 && (
              <div className="mb-6">
                <h2 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b-2 border-green-200 text-green-800">
                  📊 Client Organization Intelligence
                </h2>
                {clientOrgSections.map((section, index) => (
                  <section key={section.id} className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[24px] h-6 flex items-center justify-center">
                        {index + 1}
                      </span>
                      <h3 className="text-sm font-bold text-gray-900 pb-1 border-b border-green-100 flex-1">
                        {section.title}
                      </h3>
                    </div>
                    <div className="ml-8">
                      <ReactMarkdown components={markdownComponents}>
                        {section.content}
                      </ReactMarkdown>
                    </div>
                  </section>
                ))}
              </div>
            )}
            
           
           
          </div>
        </article>
        {/* Footer */}
        <div className="mt-4 text-center text-gray-500 text-xs">
          <p>Comprehensive market analysis report with organizational intelligence and prospect research data.</p>
          {data.project_id && <p className="mt-1">Project ID: {data.project_id}</p>}
        </div>
      </div>
    </div>
  );
};
 
export default MarketAnalysisReport;
 