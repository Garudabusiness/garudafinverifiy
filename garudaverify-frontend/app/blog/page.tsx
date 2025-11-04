'use client';

import { useState } from 'react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Importance of Loan Verification in Financial Risk Assessment',
    excerpt: 'Learn why thorough loan verification is crucial for minimizing default risk and ensuring sound lending decisions.',
    content: 'Loan verification is a critical component of the lending process. It helps financial institutions validate borrower information, assess creditworthiness, and reduce the risk of fraud and defaults...',
    author: 'Rajesh Kumar',
    date: '2025-10-28',
    category: 'Loan Verification',
    image: 'https://images.unsplash.com/photo-1554224311-beee415c201f?w=500&q=80',
    readTime: '5 min read',
    tags: ['Loan', 'Verification', 'Risk Management', 'Finance']
  },
  {
    id: '2',
    title: 'Insurance Fraud Prevention: Best Practices for Claims Investigation',
    excerpt: 'Discover effective strategies for detecting and preventing insurance fraud through comprehensive claims investigation.',
    content: 'Insurance fraud is a significant challenge for the industry. Our investigation processes combine field verification with data analytics to identify suspicious claims...',
    author: 'Priya Sharma',
    date: '2025-10-25',
    category: 'Insurance Verification',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&q=80',
    readTime: '6 min read',
    tags: ['Insurance', 'Fraud Detection', 'Claims', 'Investigation']
  },
  {
    id: '3',
    title: 'Vehicle Inspection Excellence: What to Look for in a Verification Partner',
    excerpt: 'Guidelines for selecting a reliable vehicle inspection service that provides accurate valuations and ownership verification.',
    content: 'Vehicle inspection requires expertise in assessing condition, market value, and ownership authenticity. Our trained inspectors use standardized checklists and digital documentation...',
    author: 'Amit Patel',
    date: '2025-10-22',
    category: 'Vehicle Inspection',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&q=80',
    readTime: '7 min read',
    tags: ['Vehicle', 'Inspection', 'Valuation', 'Verification']
  },
  {
    id: '4',
    title: 'Digital Verification: How Technology is Transforming Field Investigations',
    excerpt: 'Explore how modern technology and geo-tagging are revolutionizing the field verification industry.',
    content: 'The adoption of digital tools in field verification has transformed the industry. GPS tagging, real-time photo upload, and cloud-based reporting ensure transparency and accuracy...',
    author: 'Deepak Singh',
    date: '2025-10-20',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80',
    readTime: '8 min read',
    tags: ['Technology', 'Digital', 'Innovation', 'Field Verification']
  },
  {
    id: '5',
    title: 'Asset Verification in Real Estate: Protecting Lender Interests',
    excerpt: 'Understanding the critical role of asset verification in real estate lending and property-backed loans.',
    content: 'Real estate assets form the backbone of many lending products. Proper verification ensures that property valuations are accurate and ownership claims are legitimate...',
    author: 'Neha Gupta',
    date: '2025-10-18',
    category: 'Asset Verification',
    image: 'https://images.unsplash.com/photo-1560580411-076a0c94f341?w=500&q=80',
    readTime: '6 min read',
    tags: ['Asset', 'Real Estate', 'Property', 'Verification']
  },
  {
    id: '6',
    title: 'Pan-India Verification Network: Serving Financial Institutions Across the Country',
    excerpt: 'How GarudaVerify\'s extensive network enables seamless verification services across India with consistent quality.',
    content: 'Our Pan-India network of trained field agents enables us to provide verification services in urban and rural areas. This extensive reach ensures faster turnaround times...',
    author: 'Vikram Menon',
    date: '2025-10-15',
    category: 'Company News',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80',
    readTime: '5 min read',
    tags: ['Pan-India', 'Network', 'Expansion', 'Service']
  },
  {
    id: '7',
    title: 'Compliance and Security in Field Verification: Meeting GDPR and ISO Standards',
    excerpt: 'Best practices for maintaining data security and regulatory compliance in verification operations.',
    content: 'Data protection and regulatory compliance are paramount in our operations. We adhere to GDPR, ISO 27001, and other international security standards...',
    author: 'Sanjay Verma',
    date: '2025-10-12',
    category: 'Compliance',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80',
    readTime: '7 min read',
    tags: ['Compliance', 'Security', 'Data Protection', 'Standards']
  },
  {
    id: '8',
    title: 'Vendor Verification: Ensuring Supplier Reliability and Compliance',
    excerpt: 'Complete guide to vendor verification processes and how they protect business interests.',
    content: 'Vendor verification is essential for supply chain management. Our process includes identity verification, license validation, and capability assessment...',
    author: 'Arjun Singh',
    date: '2025-10-10',
    category: 'Vendor Verification',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80',
    readTime: '6 min read',
    tags: ['Vendor', 'Supplier', 'Verification', 'Compliance']
  }
];

const categories = ['All', 'Loan Verification', 'Insurance Verification', 'Vehicle Inspection', 'Asset Verification', 'Technology', 'Company News', 'Compliance', 'Vendor Verification'];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0052A3] to-[#00B4D8] text-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">GarudaVerify Blog</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl">
            Insights, updates, and best practices in verification and financial risk management
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6">
          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#00B4D8] text-lg"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[#00B4D8] text-white shadow-lg'
                    : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-2xl text-slate-600 font-medium">No blog posts found</p>
              <p className="text-slate-500 mt-2">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              <p className="text-slate-600 mb-8">{filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
                  >
                    {/* Post Image */}
                    <div className="relative h-48 overflow-hidden bg-gray-200">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="inline-block px-3 py-1 bg-[#00B4D8] text-white text-xs font-semibold rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-[#00B4D8] transition-colors">
                        {post.title}
                      </h2>

                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-blue-100 text-[#0052A3] px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="text-xs text-slate-500">
                            +{post.tags.length - 2} more
                          </span>
                        )}
                      </div>

                      {/* Post Meta */}
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                          <div className="flex items-center gap-4">
                            <span>By {post.author}</span>
                            <span>•</span>
                            <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                          </div>
                          <span>{post.readTime}</span>
                        </div>

                        <Link
                          href={`/blog/${post.id}`}
                          className="inline-block w-full px-4 py-2 bg-[#00B4D8] hover:bg-[#0096B8] text-white font-semibold rounded-lg transition-colors text-sm text-center"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="bg-gradient-to-r from-blue-900 to-cyan-900 text-white py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-8">
            Subscribe to our newsletter for the latest insights and updates in verification and financial risk management
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl focus:outline-none text-slate-900 text-lg"
            />
            <button className="px-10 py-4 rounded-xl bg-[#00B4D8] hover:bg-[#0096B8] text-white font-semibold text-lg transition-all shadow-lg hover:shadow-xl whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Related Actions */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Explore More</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Knowledge Center</h3>
              <p className="text-slate-600 mb-6">
                Comprehensive guides and documentation on verification processes
              </p>
              <Link href="/services" className="inline-block px-6 py-2 bg-[#00B4D8] text-white rounded-lg hover:bg-[#0096B8] transition-colors font-medium">
                Explore Services
              </Link>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Get in Touch</h3>
              <p className="text-slate-600 mb-6">
                Have questions? Contact our team for personalized assistance
              </p>
              <Link href="/contact" className="inline-block px-6 py-2 bg-[#00B4D8] text-white rounded-lg hover:bg-[#0096B8] transition-colors font-medium">
                Contact Us
              </Link>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Get Started</h3>
              <p className="text-slate-600 mb-6">
                Begin your verification journey with our easy onboarding process
              </p>
              <Link href="https://wa.me/919363090901" className="inline-block px-6 py-2 bg-[#00B4D8] text-white rounded-lg hover:bg-[#0096B8] transition-colors font-medium">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
