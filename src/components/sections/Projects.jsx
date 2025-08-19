'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Eye, Search, Filter, Calendar, Building2, CheckCircle, Clock, AlertCircle, X, ChevronDown, ChevronUp, Play, Target, Users, Mail, Package, Star, DollarSign, UserCheck, ArrowLeft, Tag, Snowflake, CalendarDays, Timer, FolderKanban } from 'lucide-react';
import { axiosPublic } from '@/app/api/constant';
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";

export default function ProjectsList() {
    const [projects, setProjects] = useState([]);
    const[loading,setLoading] = useState(false);
    const router = useRouter();

    function getProjectDetails() {
        axiosPublic.get("project/getProjects")
            .then(res => {
                setProjects(res.data);
            })
            .catch(err => {
                console.error('Error fetching projects:', err);
            })
    }

    useEffect(() => {
        getProjectDetails();
    }, []);

    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [collapsedOrgs, setCollapsedOrgs] = useState({});
    const [showAddForm, setShowAddForm] = useState(false);
    const [organizations, setOrganizations] = useState([]);
    const [products, setProducts] = useState([]);
    const [showAddProductModal, setShowAddProductModal] = useState(false);

    const [newProject, setNewProject] = useState({
        organization: '',
        product: '',
        additionalInfo: '',
        marketResearch: false,
        leadGeneration: false,
        content: false,
        emailOutreach: false,
        tracking: false,
        campaign_name : "",
        seasonal_campaign : false,
        season_name : "",
        start_date : new Date(),
        end_date : ""
    });

    const [newProduct, setNewProduct] = useState({
        productName: '',
        productDescription: '',
        keyFeatures: '',
        keyBenefits: '',
        differentiators: '',
        pricingTiers: '',
        customerPersona: ''
    });



    useEffect(() => {
        axiosPublic.get("project/getOrg")
            .then(res => {
                setOrganizations(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    // Fetch products when organization is selected
    useEffect(() => {
        if (newProject.organization) {
            axiosPublic.get(`project/getOrgProd/${newProject.organization}`)
                .then(res => {
                    setProducts(res.data);
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                    setProducts([]);
                });
        } else {
            setProducts([]);
            setNewProject(prev => ({ ...prev, product: '' }));
        }
    }, [newProject.organization]);

    // Group projects by organization
    const groupedProjects = projects.reduce((acc, project) => {
        if (!acc[project.company_name]) {
            acc[project.company_name] = [];
        }
        acc[project.company_name].push(project);
        return acc;
    }, {});

    // Filter projects based on search term and status
    const filteredGroupedProjects = Object.entries(groupedProjects).reduce((acc, [org, orgProjects]) => {
        const filtered = orgProjects.filter(project => {
            const matchesSearch = project?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
                project?.company_name?.toLowerCase()?.includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
        if (filtered.length > 0) {
            acc[org] = filtered;
        }
        return acc;
    }, {});

    const handleAddProduct = async () => {
        try {

            const productData = {
                "org_id": newProject.organization,
                "product_name": newProduct.productName,
                "product_services_description": newProduct.productDescription,
                "key_features": newProduct.keyFeatures,
                "key_benefits": newProduct.keyBenefits,
                "differentiators": newProduct.differentiators,
                "pricing_tiers": newProduct.pricingTiers,
                "customer_persona": newProduct.customerPersona
            }
            console.log('Submitting product data:', productData);

            const id = toast.loading("Adding product...");

            // API call to add new product
            const response = await axiosPublic.post('project/create-product', productData);

            if (response.status === 201) {
                toast.update(id,{render:"product added successfully!",status: "success",autoClose: 3000, isLoading: false});
                const updatedProducts = await axiosPublic.get(`project/getOrgProd/${newProject.organization}`);
                setProducts(updatedProducts.data);
                setNewProduct({
                    productName: '',
                    productDescription: '',
                    keyFeatures: '',
                    keyBenefits: '',
                    differentiators: '',
                    pricingTiers: '',
                    customerPersona: ''
                });
                setShowAddProductModal(false);

            }
        } catch (error) {
            console.error('Error adding product:', error);
            toast.update(id,{render:"Error adding product. Please try again.",status: "error",autoClose: 3000, isLoading: false});
        }
    };

   const handleSubmitProject = async () => {
    try {
        // Validation function to check required fields
        const validateFields = () => {
            const errors = [];
            
            // Check required fields
            if (!newProject.organization) {
                errors.push('Organization is required');
            }
            
            if (!newProject.product) {
                errors.push('Product is required');
            }
            
            if (!newProject.campaign_name) {
                errors.push('Campaign Name is required');
            }
            
            if (!newProject.start_date) {
                errors.push('Start Date is required');
            }
            
            if (!newProject.end_date) {
                errors.push('End Date is required');
            }
            
            // Check if seasonal campaign is selected but season name is missing
            if (newProject.seasonal_campaign && !newProject.season_name) {
                errors.push('Season Name is required for seasonal campaigns');
            }
            
            // Validate date range (start date should be before or equal to end date)
            if (newProject.start_date && newProject.end_date) {
                const startDate = new Date(newProject.start_date);
                const endDate = new Date(newProject.end_date);
                
                if (startDate > endDate) {
                    errors.push('Start Date must be before or equal to End Date');
                }
                
                // Optional: Check if start date is not in the past
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                if (startDate < today) {
                    errors.push('Start Date cannot be in the past');
                }
            }
            
            return errors;
        };

        // Validate all fields
        const validationErrors = validateFields();
        
        if (validationErrors.length > 0) {
            // Show all validation errors
            validationErrors.forEach(error => {
                toast.error(error);
            });
            return; // Stop execution if validation fails
        }

        setLoading(true);

        // Prepare data for API call
        const projectData = {
            org_id: newProject.organization,
            product_id: newProject.product,
            additional_info: newProject.additionalInfo || '', // Default to empty string if undefined
            market_research: newProject.marketResearch ? 'manual' : 'auto',
            lead_gen: newProject.leadGeneration ? 'manual' : 'auto',
            content: newProject.content ? 'manual' : 'auto',
            outreach: newProject.emailOutreach ? 'manual' : 'auto',
            tracking: newProject.tracking ? 'manual' : 'auto',
            status: "active",
            campaign_name: newProject.campaign_name,
            seasonal_campaign: newProject.seasonal_campaign,
            season_name: newProject.seasonal_campaign ? newProject.season_name : null, // Only include if seasonal
            start_date: newProject.start_date,
            end_date: newProject.end_date
        };

        console.log('Submitting project data:', projectData);
        
        // API call
        const response = await axiosPublic.post('project/create-project', projectData);
        
        if (response.status === 201) {
            toast.success('Project submitted successfully!');

            const body = {
                execid : response.data.project.execid,
                organizationData : response.data.project.organizationData,
                productData : response.data.project.productData,
            }

            axiosPublic.post('project/start-project',body);
            
            // Reset form and hide
            setNewProject({
                organization: '',
                product: '',
                additionalInfo: '',
                marketResearch: false,
                leadGeneration: false,
                content: false,
                emailOutreach: false,
                tracking: false,
                campaign_name: '',
                seasonal_campaign: false,
                season_name: '',
                start_date: '',
                end_date: ''
            });
            
            getProjectDetails();
            setShowAddForm(false);
        }
        
    } catch (error) {
        console.error('Error submitting project:', error);
        
        // Handle different types of errors
        if (error.response) {
            // Server responded with error status
            const errorMessage = error.response.data?.message || 'Server error occurred';
            toast.error(`Error: ${errorMessage}`);
        } else if (error.request) {
            // Request was made but no response received
            toast.error('Network error. Please check your connection.');
        } else {
            // Something else happened
            toast.error('Error submitting project. Please try again.');
        }
    }
    finally{
        setLoading(false);
    }
};

    const handleCancelForm = () => {
        setNewProject({
            organization: '',
            product: '',
            additionalInfo: '',
            marketResearch: false,
            leadGeneration: false,
            content: false,
            emailOutreach: false,
            tracking: false,
            campaign_name: '',
                seasonal_campaign: false,
                season_name: '',
                start_date: '',
                end_date: ''
        });
        setShowAddForm(false);
    };

    const handleCancelProductForm = () => {
        setNewProduct({
            productName: '',
            productDescription: '',
            keyFeatures: '',
            keyBenefits: '',
            differentiators: '',
            pricingTiers: '',
            customerPersona: ''
        });
        setShowAddProductModal(false);
    };

    const handleViewProject = (project) => {
        router.push(`/Projects?execId=${project.execid}&step=${project.status}`)
    };

    const toggleOrgCollapse = (org) => {
        setCollapsedOrgs(prev => ({
            ...prev,
            [org]: !prev[org]
        }));
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'started':
                return <Play className="w-4 h-4 text-blue-600" />;
            case 'market research':
                return <Target className="w-4 h-4 text-purple-600" />;
            case 'leads':
                return <Users className="w-4 h-4 text-orange-600" />;
            case 'email outreach':
                return <Mail className="w-4 h-4 text-indigo-600" />;
            default:
                return <Clock className="w-4 h-4 text-gray-600" />;
        }
    };

    const getStatusBadge = (status) => {
        const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
        switch (status) {
            case 'completed':
                return `${baseClasses} bg-green-100 text-green-800`;
            case 'started':
                return `${baseClasses} bg-blue-100 text-blue-800`;
            case 'market research':
                return `${baseClasses} bg-purple-100 text-purple-800`;
            case 'leads':
                return `${baseClasses} bg-orange-100 text-orange-800`;
            case 'email outreach':
                return `${baseClasses} bg-indigo-100 text-indigo-800`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };

    return (
        <>
        {loading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mb-4"></div>
          <div className="text-white text-sm font-bold tracking-widest">Loading...</div>
        </div>
      )}
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6 lg:p-4">

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className={`bg-white rounded-lg shadow-lg border border-gray-200 py-4 px-3 mb-6 transition-all duration-500 ${showAddForm ? 'fade-out' : 'fade-in-up'}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-md font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Projects Dashboard
                            </h1>
                            <p className="text-gray-600 mt-1 text-xs">Manage and track your projects by organization</p>
                        </div>
                        {!showAddForm && (
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="inline-flex items-center px-4 py-3 text-xs bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Project
                            </button>
                        )}
                    </div>
                </div>

                {/* Add Project Form */}
                {showAddForm && (
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6 slide-down">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={handleCancelForm}
                                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                                <div>
                                    <h2 className="text-md font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        Create New Project
                                    </h2>
                                    <p className="text-gray-600 text-sm">Fill in the details to get started</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex space-x-6'>
                            {/* Organization Selection */}
                            <div className="mb-6 w-full">
                                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2 required">
                                    <Building2 className="w-4 h-4 text-blue-500" />
                                    <span>Organization</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={newProject.organization}
                                        onChange={(e) => setNewProject({ ...newProject, organization: e.target.value })}
                                        className="w-full px-4 py-3 border text-xs border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white appearance-none"
                                    >
                                        <option value="" disabled>Select an organization</option>
                                        {organizations.map((org) => (
                                            <option key={org.org_id} value={org.org_id}>
                                                {org.company_name}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Products Section */}
                            {newProject.organization && (
                                <div className="mb-6 w-full">
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 required">
                                            <Package className="w-4 h-4 text-blue-500" />
                                            <span>Products</span>
                                        </label>
                                        <button
                                            onClick={() => setShowAddProductModal(true)}
                                            className="inline-flex items-center px-3 py-1.5 text-xs bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 font-medium shadow-sm hover:shadow-md"
                                        >
                                            <Plus className="w-3 h-3 mr-1" />
                                            Add Product
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <select
                                            value={newProject.product}
                                            onChange={(e) => setNewProject({ ...newProject, product: e.target.value })}
                                            className="w-full px-4 py-3 border text-xs border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white appearance-none"
                                        >
                                            <option value="" disabled>Select a product</option>
                                            {products.map((product, index) => (
                                                <option key={index} value={product.product_id}>
                                                    {product.product_name}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Campaign Details Section */}
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                                <Target className="w-4 h-4 text-purple-500" />
                                <span>Campaign Details</span>
                            </h3>

                            {/* Campaign Name */}
                            <div className="mb-4">
                                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2 required">
                                    <Tag className="w-4 h-4 text-blue-500" />
                                    <span>Campaign Name</span>
                                </label>
                                <input
                                    type="text"
                                    value={newProject.campaign_name}
                                    onChange={(e) => setNewProject({ ...newProject, campaign_name: e.target.value })}
                                    className="w-full px-4 py-3 border text-xs border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                                    placeholder="Enter campaign name..."
                                />
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            {/* Seasonal Campaign Toggle */}
                            <div className="mb-4">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={newProject.seasonal_campaign}
                                        onChange={(e) => setNewProject({
                                            ...newProject,
                                            seasonal_campaign: e.target.checked,
                                            // Clear season name if seasonal campaign is unchecked
                                            season_name: e.target.checked ? newProject.season_name : ''
                                        })}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="w-4 h-4 text-orange-500" />
                                        <span className="text-sm font-semibold text-gray-700">Seasonal Campaign</span>
                                    </div>
                                </label>
                            </div>

                            {/* Season Name (Conditional) */}
                            {newProject.seasonal_campaign && (
                                <div className="mb-4">
                                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2 required">
                                        <Snowflake className="w-4 h-4 text-blue-500" />
                                        <span>Season Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={newProject.season_name}
                                        onChange={(e) => setNewProject({ ...newProject, season_name: e.target.value })}
                                        className="w-full px-4 py-3 border text-xs border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                                        placeholder="e.g., Winter 2024, Holiday Season, Spring Collection..."
                                    />
                                </div>
                            )}
                            </div>

                            {/* Date Range */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Start Date */}
                                <div>
                                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2 required">
                                        <CalendarDays className="w-4 h-4 text-green-500" />
                                        <span>Start Date</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={newProject.start_date}
                                        min={new Date().toISOString().split("T")[0]}
                                        onChange={(e) => setNewProject({ ...newProject, start_date: e.target.value })}
                                        className="w-full px-4 py-3 border text-xs border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                                    />
                                </div>

                                {/* End Date */}
                                <div>
                                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2 required">
                                        <CalendarDays className="w-4 h-4 text-red-500" />
                                        <span>End Date</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={newProject.end_date}
                                        min={newProject.start_date}
                                        onChange={(e) => setNewProject({ ...newProject, end_date: e.target.value })}
                                        className="w-full px-4 py-3 border text-xs border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="mb-6">
                            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                                <AlertCircle className="w-4 h-4 text-blue-500" />
                                <span>Additional Info</span>
                            </label>
                            <textarea
                                value={newProject.additionalInfo}
                                onChange={(e) => setNewProject({ ...newProject, additionalInfo: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-3 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none bg-gray-50 focus:bg-white"
                                placeholder="Any additional information about the project..."
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-8">
                            <button
                                onClick={handleCancelForm}
                                className="flex-1 px-6 py-3 text-sm border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-medium flex items-center justify-center"
                            >
                                <X className="w-4 h-4 mr-2" />
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitProject}
                                // disabled={!newProject.organization || !newProject.product || !newProject.campaign_name || !newProject.start_date || !newProject.end_date}
                                className="flex-1 px-6 py-3 text-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
                            >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Create Project
                            </button>
                        </div>
                    </div>
                )}

                {/* Filters */}
                {!showAddForm && (
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 mb-8 fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1">
                                <div className="relative group">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Search projects..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                                    />
                                </div>
                            </div>

                            {/* Status Filter */}
                            <div className="sm:w-56">
                                <div className="relative group">
                                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border text-xs border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none bg-gray-50 focus:bg-white"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="started">Started</option>
                                        <option value="market research">Market Research</option>
                                        <option value="leads">Leads</option>
                                        <option value="email outreach">Email Outreach</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Organizations and Projects */}
                {!showAddForm && (
                    <div className="space-y-8 fade-in">
                        {Object.entries(filteredGroupedProjects).map(([organization, orgProjects], orgIndex) => (
                            <div key={organization} className="fade-in-up" style={{ animationDelay: `${0.2 + orgIndex * 0.1}s` }}>
                                {/* Organization Header */}
                                <div className="mb-3">
                                    <div
                                        className={`bg-gradient-to-r border-2 border-blue-600 p-1 rounded-lg shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1`}
                                        onClick={() => toggleOrgCollapse(organization)}
                                    >
                                        <div className="flex items-center justify-between text-black">
                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                                                    <Building2 className="w-6 h-6 text-blue-500" />
                                                </div>
                                                <div>
                                                    <h2 className="text-sm font-bold">{organization}</h2>
                                                    <p className="text-black text-opacity-90 text-xs">
                                                        {orgProjects.length} project{orgProjects.length !== 1 ? 's' : ''}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <div className="flex space-x-2">
                                                    {[...new Set(orgProjects.map(p => p.status))].slice(0, 3).map((status, i) => (
                                                        <div key={status} className="flex items-center space-x-1 bg-white bg-opacity-20 px-2 py-1 rounded-full">
                                                            {getStatusIcon(status)}
                                                            <span className="text-xs font-medium capitalize">{status.replace(' ', ' ')}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                {collapsedOrgs[organization] ?
                                                    <ChevronDown className="w-6 h-6 transition-transform duration-300" /> :
                                                    <ChevronUp className="w-6 h-6 transition-transform duration-300" />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Projects Grid */}
                                <div className={`transition-all duration-500 overflow-hidden ${collapsedOrgs[organization] ? 'max-h-0 opacity-0' : 'max-h-none opacity-100'}`}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {orgProjects.map((project, projectIndex) => {
                                            const stages = ['market research', 'lead generation', 'content creation', 'campaign settings', 'outreach', 'tracking & analytics'];
                                            const currentStageIndex = stages.indexOf(project.status.toLowerCase());

                                            return (
                                                <div
                                                    key={project.id}
                                                    className="bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 corner-accent scale-in group overflow-hidden"
                                                    style={{ animationDelay: `${0.3 + projectIndex * 0.1}s` }}
                                                >
                                                    <div className="p-4 relative">
                                                        {/* Execution ID */}
                                                        <div className="mb-3">
                                                            <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                                Project ID: {project.execid}
                                                            </span>
                                                        </div>

                                                        {/* Company Name */}
                                                        <div className="flex items-center text-gray-800 mb-4">
                                                            <FolderKanban className="w-5 h-5 mr-2 text-blue-500" />
                                                            <h3 className="text-sm font-bold group-hover:text-blue-600 transition-colors duration-300">
                                                                {project.campaign_name || `Project ${projectIndex}`}
                                                            </h3>
                                                        </div>
                                                        {project.start_date && project.end_date &&
                                                        <div className="flex items-center text-gray-800 mb-4">
                                                            <Timer className="w-5 h-5 mr-2 text-blue-500" />
                                                            <span className='flex gap-4'>
                                                            <span className='text-xs'>{project.start_date}</span>
                                                            <span className='text-xs'>To</span>
                                                            <span className='text-xs'>{project.end_date}</span>
                                                            </span>
                                                        
                                                        </div>
                                        }

                                                        {/* Current Status/Stage */}
                                                        <div className="flex items-center mb-4">
                                                            {getStatusIcon(project.status)}
                                                            <span className={`ml-2 ${getStatusBadge(project.status)}`}>
                                                                Current: {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                                            </span>
                                                        </div>

                                                        {/* Stages Progress */}
                                                        {/* <div className="mb-6">
                                                            <h4 className="text-sm font-medium text-gray-700 mb-3">Project Stages</h4>
                                                            <div className=" flex space-x-2 overflow-auto">
                                                                {stages.map((stage, index) => (
                                                                    <div key={stage} className="flex items-center w-full">
                                                                        <div className={`w-3 h-3 rounded-full mr-3 ${index <= currentStageIndex
                                                                                ? 'bg-green-500'
                                                                                : index === currentStageIndex + 1
                                                                                    ? 'bg-blue-500'
                                                                                    : 'bg-gray-300'
                                                                            }`}></div>
                                                                        <span className={`text-sm ${index <= currentStageIndex
                                                                                ? 'text-green-700 font-medium'
                                                                                : index === currentStageIndex + 1
                                                                                    ? 'text-blue-700 font-medium'
                                                                                    : 'text-gray-500'
                                                                            }`}>
                                                                            {stage.charAt(0).toUpperCase() + stage.slice(1)}
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div> */}

                                                        <button
                                                            onClick={() => handleViewProject(project)}
                                                            className="w-full bg-gradient-to-r text-xs from-blue-600 to-blue-700 text-white px-3 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                                        >
                                                            <Eye className="w-4 h-4 mr-2" />
                                                            View Project
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                )}

                {/* No projects found */}
                {!showAddForm && Object.keys(filteredGroupedProjects).length === 0 && (
                    <div className="text-center py-4 fade-in-up">
                        <div className="text-gray-400 mb-6">
                            <Search className="w-8 h-8 mx-auto" />
                        </div>
                        <h3 className="text-md font-bold text-gray-900 mb-3">No projects found</h3>
                        <p className="text-gray-600 mb-6 text-sm">Try adjusting your search criteria or add a new project.</p>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="inline-flex items-center text-sm px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Add Your First Project
                        </button>
                    </div>
                )}
            </div>
            {/* Add Product Modal */}
            {showAddProductModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 fade-in">
                    <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-full max-w-4xl max-h-[90vh] overflow-y-auto scale-in">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        Add New Product
                                    </h3>
                                    <p className="text-gray-600 text-sm mt-1">Create a new product for your organization</p>
                                </div>
                                <button
                                    onClick={handleCancelProductForm}
                                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="px-6 py-6">
                            <form onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }} className="space-y-6">

                                <div>
                                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                                        <Package className="w-4 h-4 text-blue-500" />
                                        <span>Product/Service Name</span>
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        value={newProduct.productName}
                                        onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none bg-gray-50 focus:bg-white"
                                        placeholder="Describe your product or service in detail..."
                                    />
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                                    {/* Product/Service Description */}
                                    <div>
                                        <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                                            <Package className="w-4 h-4 text-blue-500" />
                                            <span>Product/Service Description</span>
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            value={newProduct.productDescription}
                                            onChange={(e) => setNewProduct({ ...newProduct, productDescription: e.target.value })}
                                            rows={3}
                                            required
                                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none bg-gray-50 focus:bg-white"
                                            placeholder="Describe your product or service in detail..."
                                        />
                                    </div>


                                    {/* Key Features */}
                                    <div>
                                        <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                                            <Star className="w-4 h-4 text-yellow-500" />
                                            <span>Key Features</span>

                                        </label>
                                        <textarea
                                            value={newProduct.keyFeatures}
                                            onChange={(e) => setNewProduct({ ...newProduct, keyFeatures: e.target.value })}
                                            rows={3}

                                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none bg-gray-50 focus:bg-white"
                                            placeholder="List the main features of your product..."
                                        />
                                    </div>


                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                                    {/* Key Benefits */}
                                    <div>
                                        <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            <span>Key Benefits</span>

                                        </label>
                                        <textarea
                                            value={newProduct.keyBenefits}
                                            onChange={(e) => setNewProduct({ ...newProduct, keyBenefits: e.target.value })}
                                            rows={3}

                                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none bg-gray-50 focus:bg-white"
                                            placeholder="Describe the benefits customers will get..."
                                        />
                                    </div>

                                    {/* Differentiators */}
                                    <div>
                                        <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                                            <Target className="w-4 h-4 text-purple-500" />
                                            <span>Differentiators</span>

                                        </label>
                                        <textarea
                                            value={newProduct.differentiators}
                                            onChange={(e) => setNewProduct({ ...newProduct, differentiators: e.target.value })}
                                            rows={3}

                                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none bg-gray-50 focus:bg-white"
                                            placeholder="What makes your product unique compared to competitors..."
                                        />
                                    </div>



                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Pricing Tiers */}
                                    <div>
                                        <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                                            <DollarSign className="w-4 h-4 text-green-600" />
                                            <span>Pricing Tiers</span>

                                        </label>
                                        <textarea
                                            value={newProduct.pricingTiers}
                                            onChange={(e) => setNewProduct({ ...newProduct, pricingTiers: e.target.value })}
                                            rows={3}

                                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none bg-gray-50 focus:bg-white"
                                            placeholder="Describe your pricing structure and tiers..."
                                        />
                                    </div>

                                    {/* Customer Persona */}
                                    <div>
                                        <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                                            <UserCheck className="w-4 h-4 text-indigo-500" />
                                            <span>Customer Persona</span>

                                        </label>
                                        <textarea
                                            value={newProduct.customerPersona}
                                            onChange={(e) => setNewProduct({ ...newProduct, customerPersona: e.target.value })}
                                            rows={3}

                                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none bg-gray-50 focus:bg-white"
                                            placeholder="Describe your ideal customer profile..."
                                        />
                                    </div>
                                </div>
                                <div>
                                    <span className='text-xs font-bold bg-blue-500 p-1 text-white'> Note : This product will be added to your existing organization products</span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={handleCancelProductForm}
                                        className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-medium flex items-center justify-center"
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
                                    >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Add Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
    );
}