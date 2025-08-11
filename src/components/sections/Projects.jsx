'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Eye, Search, Filter, Calendar, Building2, CheckCircle, Clock, AlertCircle, X, ChevronDown, ChevronUp, Play, Target, Users, Mail, Package, Star, DollarSign, UserCheck, ArrowLeft } from 'lucide-react';
import { axiosPublic } from '@/app/api/constant';
import { toast } from 'react-toastify';

export default function ProjectsList() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axiosPublic.get("project/getProjects")
            .then(res => {
                setProjects(res.data);
            })
            .catch(err => {
                console.error('Error fetching projects:', err);
            })
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
        tracking: false
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

            // API call to add new product
            const response = await axiosPublic.post('project/create-product', productData);

            if (response.status === 201) {
                toast.success("product added successfully!");
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
            toast.error('Error adding product. Please try again.');
        }
    };

    const handleSubmitProject = async () => {
        try {
            // Prepare data for API call
            const projectData = {
                org_id: newProject.organization,
                product_id: newProject.product,
                additional_info: newProject.additionalInfo,
                market_research: newProject.marketResearch ? 'manual' : 'auto',
                lead_gen: newProject.leadGeneration ? 'manual' : 'auto',
                content: newProject.content ? 'manual' : 'auto',
                outreach: newProject.emailOutreach ? 'manual' : 'auto',
                tracking: newProject.tracking ? 'manual' : 'auto',
                status: "active"
            };

            console.log('Submitting project data:', projectData);

            debugger;

            // API call
            await axiosPublic.post('project/create-project', projectData)
                .then(res => {
                    if (res.status === 201) {
                        toast.success('Project submitted successfully!');
                        // Reset form and hide
                        setNewProject({
                            organization: '',
                            product: '',
                            additionalInfo: '',
                            marketResearch: false,
                            leadGeneration: false,
                            content: false,
                            emailOutreach: false,
                            tracking: false
                        });
                        setShowAddForm(false);
                    }
                })
        } catch (error) {
            console.error('Error submitting project:', error);
            toast.error('Error submitting project. Please try again.');
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
            tracking: false
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
        setSelectedProject(project);
        setShowViewModal(true);
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6 lg:p-4">
            <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-30px); }
        }
        .fade-in-up { animation: fadeInUp 0.6s ease-out; }
        .slide-in-left { animation: slideInLeft 0.4s ease-out; }
        .scale-in { animation: scaleIn 0.3s ease-out; }
        .fade-in { animation: fadeIn 0.5s ease-out; }
        .fade-out { animation: fadeOut 0.5s ease-out; }
        .slide-down { animation: slideDown 0.5s ease-out; }
        .slide-up { animation: slideUp 0.5s ease-out; }
        .corner-accent {
          position: relative;
        }
        .corner-accent::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 50px;
          height: 50px;
          border-top: 3px solid #3b82f6;
          border-left: 3px solid #3b82f6;
          border-top-left-radius: 8px;
        }
        .corner-accent::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 50px;
          height: 50px;
          border-bottom: 3px solid #3b82f6;
          border-right: 3px solid #3b82f6;
          border-bottom-right-radius: 8px;
        }
      `}</style>

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
                                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
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
                                        <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
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
                                                    {product.product_id}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            )}

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

                        {/* Wait for Approval Section */}
                        {/* <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                                <Clock className="w-5 h-5 text-blue-500" />
                                <span>Wait for My Approval</span>
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <label className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={newProject.marketResearch}
                                        onChange={(e) => setNewProject({ ...newProject, marketResearch: e.target.checked })}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <Target className="w-4 h-4 text-purple-600" />
                                    <span className="text-sm font-medium text-gray-700">Market Research</span>
                                </label>

                                <label className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={newProject.leadGeneration}
                                        onChange={(e) => setNewProject({ ...newProject, leadGeneration: e.target.checked })}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <Users className="w-4 h-4 text-orange-600" />
                                    <span className="text-sm font-medium text-gray-700">Lead Generation</span>
                                </label>

                                <label className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={newProject.content}
                                        onChange={(e) => setNewProject({ ...newProject, content: e.target.checked })}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <Package className="w-4 h-4 text-green-600" />
                                    <span className="text-sm font-medium text-gray-700">Content</span>
                                </label>

                                <label className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={newProject.emailOutreach}
                                        onChange={(e) => setNewProject({ ...newProject, emailOutreach: e.target.checked })}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <Mail className="w-4 h-4 text-indigo-600" />
                                    <span className="text-sm font-medium text-gray-700">Email Outreach</span>
                                </label>

                                <label className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={newProject.tracking}
                                        onChange={(e) => setNewProject({ ...newProject, tracking: e.target.checked })}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <Eye className="w-4 h-4 text-red-600" />
                                    <span className="text-sm font-medium text-gray-700">Tracking</span>
                                </label>
                            </div>
                        </div> */}

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
                                disabled={!newProject.organization || !newProject.product}
                                className="flex-1 px-6 py-3 text-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
                            >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Submit Project
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
                                                            <Building2 className="w-5 h-5 mr-2 text-blue-500" />
                                                            <h3 className="text-sm font-bold group-hover:text-blue-600 transition-colors duration-300">
                                                                {project.company_name}
                                                            </h3>
                                                        </div>

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
    );
}