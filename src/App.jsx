// @ts-nocheck
'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function SinglePageDashboard() {
  const [activeTab, setActiveTab] = useState(() => { try { return localStorage.getItem('goa:lastActiveTab') || 'dashboard'; } catch (_) { return 'dashboard'; } });
  // Metric builder state for Master V4
  const [selectedMetricPlatform, setSelectedMetricPlatform] = useState(null);
  const [metricSearch, setMetricSearch] = useState('');
  const [selectedMetricSearch, setSelectedMetricSearch] = useState('');
  const [dashboardMetrics, setDashboardMetrics] = useState([
  {
    "id": "p3-1",
    "platform": "Google Analytics",
    "name": "Total Users",
    "type": "Number and Chart",
    "col": 0,
    "row": 0,
    "w": 1,
    "h": 1,
    "pageId": "p3",
    "section": "Summary",
    "metricReference": "totalUsers",
    "notes": "Top row"
  },
  {
    "id": "p3-2",
    "platform": "Google Analytics",
    "name": "New Users",
    "type": "Number and Chart",
    "col": 1,
    "row": 0,
    "w": 1,
    "h": 1,
    "pageId": "p3",
    "section": "Summary",
    "metricReference": "newUsers",
    "notes": "Top row"
  },
  {
    "id": "p3-3",
    "platform": "Google Analytics",
    "name": "Sessions",
    "type": "Number and Chart",
    "col": 2,
    "row": 0,
    "w": 1,
    "h": 1,
    "pageId": "p3",
    "section": "Summary",
    "metricReference": "sessions",
    "notes": "Top row"
  },
  {
    "id": "p3-4",
    "platform": "Google Analytics",
    "name": "Engagement Rate",
    "type": "Number and Chart",
    "col": 3,
    "row": 0,
    "w": 1,
    "h": 1,
    "pageId": "p3",
    "section": "Summary",
    "metricReference": "engagementRate",
    "notes": "Top row; format as percentage"
  },
  {
    "id": "p3-5",
    "platform": "Google Analytics",
    "name": "Total Users by Country",
    "type": "Pie Chart",
    "col": 0,
    "row": 1,
    "w": 2,
    "h": 2,
    "pageId": "p3",
    "section": "Acquisition & Audience",
    "metricReference": "country + totalUsers",
    "notes": "Second row"
  },
  {
    "id": "p3-6",
    "platform": "Google Analytics",
    "name": "Sessions by Source",
    "type": "Bar Chart",
    "col": 2,
    "row": 1,
    "w": 2,
    "h": 2,
    "pageId": "p3",
    "section": "Acquisition & Audience",
    "metricReference": "sessionSourceMedium + sessions",
    "notes": "Second row; Paid Search, Organic Search, Direct, Referral, etc."
  },
  {
    "id": "p3-7",
    "platform": "Google Analytics",
    "name": "Total Users by Country",
    "type": "Maps",
    "col": 0,
    "row": 3,
    "w": 4,
    "h": 2,
    "pageId": "p3",
    "section": "Geographic Analysis",
    "metricReference": "country / city + totalUsers",
    "notes": "Large map card"
  },
  {
    "id": "p3-8",
    "platform": "Google Analytics",
    "name": "Traffic Acquisition",
    "type": "Table",
    "col": 0,
    "row": 5,
    "w": 4,
    "h": 2,
    "pageId": "p3",
    "section": "Acquisition Analysis",
    "metricReference": "sessionDefaultChannelGroup + sessions and available supporting metrics",
    "notes": "Large table card"
  },
  {
    "id": "p3-9",
    "platform": "Google Analytics",
    "name": "Top Landing Pages",
    "type": "Table",
    "col": 0,
    "row": 7,
    "w": 4,
    "h": 2,
    "pageId": "p3",
    "section": "Content Performance",
    "metricReference": "landingPage + sessions and available supporting metrics",
    "notes": "Large table card"
  },
  {
    "id": "p5-1",
    "platform": "Google Ads",
    "name": "Clicks by Campaign",
    "type": "Bar Chart",
    "col": 0,
    "row": 0,
    "w": 2,
    "h": 2,
    "pageId": "p5",
    "section": "Campaign Analysis",
    "metricReference": "clicks + campaign",
    "notes": "Top campaigns by clicks."
  },
  {
    "id": "p5-2",
    "platform": "Google Ads",
    "name": "Clicks by Network",
    "type": "Pie Chart",
    "col": 2,
    "row": 0,
    "w": 2,
    "h": 2,
    "pageId": "p5",
    "section": "Network Analysis",
    "metricReference": "clicks + network",
    "notes": "Clicks breakdown by network."
  },
  {
    "id": "p5-3",
    "platform": "Google Ads",
    "name": "Clicks",
    "type": "Number and Chart",
    "col": 0,
    "row": 2,
    "w": 1,
    "h": 1,
    "pageId": "p5",
    "section": "Summary",
    "metricReference": "clicks",
    "notes": "KPI card with trend sparkline."
  },
  {
    "id": "p5-4",
    "platform": "Google Ads",
    "name": "Impressions",
    "type": "Number and Chart",
    "col": 1,
    "row": 2,
    "w": 1,
    "h": 1,
    "pageId": "p5",
    "section": "Summary",
    "metricReference": "impressions",
    "notes": "KPI card with trend sparkline."
  },
  {
    "id": "p5-5",
    "platform": "Google Ads",
    "name": "Average CPC",
    "type": "Number and Chart",
    "col": 2,
    "row": 2,
    "w": 1,
    "h": 1,
    "pageId": "p5",
    "section": "Summary",
    "metricReference": "average_cpc",
    "notes": "KPI card with trend sparkline."
  },
  {
    "id": "p5-6",
    "platform": "Google Ads",
    "name": "Amount Spent",
    "type": "Number and Chart",
    "col": 3,
    "row": 2,
    "w": 1,
    "h": 1,
    "pageId": "p5",
    "section": "Summary",
    "metricReference": "cost_micros",
    "notes": "KPI card with trend sparkline."
  },
  {
    "id": "p5-7",
    "platform": "Google Ads",
    "name": "CPC by Campaign",
    "type": "Bar Chart",
    "col": 0,
    "row": 3,
    "w": 2,
    "h": 2,
    "pageId": "p5",
    "section": "Campaign Analysis",
    "metricReference": "average_cpc + campaign",
    "notes": "Top campaigns by CPC."
  },
  {
    "id": "p5-8",
    "platform": "Google Ads",
    "name": "Cost by Campaign",
    "type": "Bar Chart",
    "col": 2,
    "row": 3,
    "w": 2,
    "h": 2,
    "pageId": "p5",
    "section": "Campaign Analysis",
    "metricReference": "cost_micros + campaign",
    "notes": "Top campaigns by cost."
  },
  {
    "id": "p5-9",
    "platform": "Google Ads",
    "name": "Landing Page",
    "type": "Table",
    "col": 0,
    "row": 5,
    "w": 2,
    "h": 2,
    "pageId": "p5",
    "section": "Assets & Traffic",
    "metricReference": "landing page metrics",
    "notes": "Landing page performance table."
  },
  {
    "id": "p5-10",
    "platform": "Google Ads",
    "name": "Sitelink Performance",
    "type": "Table",
    "col": 2,
    "row": 5,
    "w": 2,
    "h": 2,
    "pageId": "p5",
    "section": "Assets & Traffic",
    "metricReference": "sitelink metrics",
    "notes": "Approved sitelink performance table; exact card mapping is present in Master Metrics."
  },
  {
    "id": "p5-11",
    "platform": "Google Ads",
    "name": "Keyword Performance",
    "type": "Table",
    "col": 0,
    "row": 7,
    "w": 2,
    "h": 2,
    "pageId": "p5",
    "section": "Assets & Traffic",
    "metricReference": "keyword metrics",
    "notes": "Approved keyword performance table; exact card mapping is present in Master Metrics."
  },
  {
    "id": "p5-12",
    "platform": "Google Ads",
    "name": "Campaign by Country",
    "type": "Bar Chart",
    "col": 2,
    "row": 7,
    "w": 2,
    "h": 2,
    "pageId": "p5",
    "section": "Geographic Analysis",
    "metricReference": "country + campaign metrics",
    "notes": "Geographic campaign performance."
  },
  {
    "id": "p5-13",
    "platform": "Google Ads",
    "name": "Campaign Performance",
    "type": "Table",
    "col": 0,
    "row": 9,
    "w": 4,
    "h": 2,
    "pageId": "p5",
    "section": "Campaign Analysis",
    "metricReference": "campaign metrics",
    "notes": "Overall campaign performance table."
  },
  {
    "id": "p4-1",
    "platform": "Google Business Profile",
    "name": "Overview",
    "type": "Number and Chart",
    "col": 0,
    "row": 0,
    "w": 1,
    "h": 1,
    "pageId": "p4",
    "section": "Summary",
    "metricReference": "Sum of four Business Impressions metrics",
    "notes": "Top row; calculated total profile impressions."
  },
  {
    "id": "p4-2",
    "platform": "Google Business Profile",
    "name": "Website Clicks",
    "type": "Number and Chart",
    "col": 1,
    "row": 0,
    "w": 1,
    "h": 1,
    "pageId": "p4",
    "section": "Summary",
    "metricReference": "WEBSITE_CLICKS",
    "notes": "Top row."
  },
  {
    "id": "p4-3",
    "platform": "Google Business Profile",
    "name": "Direction Requests",
    "type": "Number and Chart",
    "col": 2,
    "row": 0,
    "w": 1,
    "h": 1,
    "pageId": "p4",
    "section": "Summary",
    "metricReference": "BUSINESS_DIRECTION_REQUESTS",
    "notes": "Top row."
  },
  {
    "id": "p4-4",
    "platform": "Google Business Profile",
    "name": "Call Clicks",
    "type": "Number and Chart",
    "col": 3,
    "row": 0,
    "w": 1,
    "h": 1,
    "pageId": "p4",
    "section": "Summary",
    "metricReference": "CALL_CLICKS",
    "notes": "Top row."
  },
  {
    "id": "p4-5",
    "platform": "Google Business Profile",
    "name": "Device",
    "type": "Bar Chart",
    "col": 0,
    "row": 1,
    "w": 2,
    "h": 2,
    "pageId": "p4",
    "section": "Audience Breakdown",
    "metricReference": "Desktop vs Mobile; derived from four Business Impressions metrics",
    "notes": "Desktop and Mobile impressions."
  },
  {
    "id": "p4-6",
    "platform": "Google Business Profile",
    "name": "Views: Maps vs Search",
    "type": "Bar Chart",
    "col": 2,
    "row": 1,
    "w": 2,
    "h": 2,
    "pageId": "p4",
    "section": "Discovery Breakdown",
    "metricReference": "Maps vs Search; derived from four Business Impressions metrics",
    "notes": "Google Maps vs Google Search impressions."
  },
  {
    "id": "p4-7",
    "platform": "Google Business Profile",
    "name": "Search Keywords",
    "type": "Table",
    "col": 0,
    "row": 3,
    "w": 4,
    "h": 2,
    "pageId": "p4",
    "section": "Search Insights",
    "metricReference": "Monthly search keyword impressions endpoint",
    "notes": "Monthly keyword impressions."
  },
  {
    "id": "p9-1",
    "platform": "YouTube Analytics",
    "name": "Views",
    "type": "Number and Chart",
    "col": 0,
    "row": 0,
    "w": 1,
    "h": 1,
    "pageId": "p9",
    "section": "Summary",
    "metricReference": "views",
    "notes": "Top row, first Card"
  },
  {
    "id": "p9-2",
    "platform": "YouTube Analytics",
    "name": "Watch Time",
    "type": "Number and Chart",
    "col": 1,
    "row": 0,
    "w": 1,
    "h": 1,
    "pageId": "p9",
    "section": "Summary",
    "metricReference": "estimatedMinutesWatched",
    "notes": "Top row, second Card; API returns minutes"
  },
  {
    "id": "p9-3",
    "platform": "YouTube Analytics",
    "name": "Earn",
    "type": "Number and Chart",
    "col": 2,
    "row": 0,
    "w": 1,
    "h": 1,
    "pageId": "p9",
    "section": "Summary",
    "metricReference": "estimatedRevenue",
    "notes": "Top row, third Card; requires monetisation eligibility and monetary read scope"
  },
  {
    "id": "p9-4",
    "platform": "YouTube Analytics",
    "name": "Net Subscribers",
    "type": "Number and Chart",
    "col": 3,
    "row": 0,
    "w": 1,
    "h": 1,
    "pageId": "p9",
    "section": "Summary",
    "metricReference": "subscribersGained minus subscribersLost",
    "notes": "Top row, fourth Card; calculated metric"
  },
  {
    "id": "p9-5",
    "platform": "YouTube Analytics",
    "name": "Interaction",
    "type": "Bar Chart",
    "col": 0,
    "row": 1,
    "w": 2,
    "h": 2,
    "pageId": "p9",
    "section": "Engagement",
    "metricReference": "likes, comments, shares",
    "notes": "Second row, left; three separate metrics"
  },
  {
    "id": "p9-6",
    "platform": "YouTube Analytics",
    "name": "Views by Country",
    "type": "Bar Chart",
    "col": 2,
    "row": 1,
    "w": 2,
    "h": 2,
    "pageId": "p9",
    "section": "Audience",
    "metricReference": "country + views",
    "notes": "Second row, right; country performance breakdown"
  },
  {
    "id": "p9-7",
    "platform": "YouTube Analytics",
    "name": "Views by Top Videos",
    "type": "Bar Chart",
    "col": 0,
    "row": 3,
    "w": 2,
    "h": 2,
    "pageId": "p9",
    "section": "Content Performance",
    "metricReference": "video + views",
    "notes": "Third row, left; default Top 5"
  },
  {
    "id": "p9-8",
    "platform": "YouTube Analytics",
    "name": "Views by Device",
    "type": "Bar Chart",
    "col": 2,
    "row": 3,
    "w": 2,
    "h": 2,
    "pageId": "p9",
    "section": "Audience",
    "metricReference": "deviceType + views",
    "notes": "Third row, right"
  },
  {
    "id": "p9-9",
    "platform": "YouTube Analytics",
    "name": "Each Video Insight",
    "type": "Table",
    "col": 0,
    "row": 5,
    "w": 4,
    "h": 2,
    "pageId": "p9",
    "section": "Content Performance",
    "metricReference": "video + views, likes, shares, comments, estimatedRevenue",
    "notes": "Bottom row; revenue column conditional on monetisation access"
  },
  {
    "id": "p6-1",
    "platform": "Meta Ads",
    "name": "Total Spent",
    "type": "Number and Chart",
    "col": 0,
    "row": 0,
    "w": 1,
    "h": 1,
    "pageId": "p6",
    "section": "Summary",
    "metricReference": "spend",
    "notes": "Approved small KPI card, first position."
  },
  {
    "id": "p6-2",
    "platform": "Meta Ads",
    "name": "Average CPC",
    "type": "Number",
    "col": 1,
    "row": 0,
    "w": 1,
    "h": 1,
    "pageId": "p6",
    "section": "Summary",
    "metricReference": "CPC",
    "notes": "Approved small KPI card."
  },
  {
    "id": "p6-3",
    "platform": "Meta Ads",
    "name": "Reach",
    "type": "Number",
    "col": 2,
    "row": 0,
    "w": 1,
    "h": 1,
    "pageId": "p6",
    "section": "Summary",
    "metricReference": "reach",
    "notes": "Approved small KPI card."
  },
  {
    "id": "p6-4",
    "platform": "Meta Ads",
    "name": "Impressions",
    "type": "Number",
    "col": 3,
    "row": 0,
    "w": 1,
    "h": 1,
    "pageId": "p6",
    "section": "Summary",
    "metricReference": "impressions",
    "notes": "Approved small KPI card."
  },
  {
    "id": "p6-5",
    "platform": "Meta Ads",
    "name": "Reach by Campaign",
    "type": "Bar Chart",
    "col": 0,
    "row": 1,
    "w": 2,
    "h": 2,
    "pageId": "p6",
    "section": "Performance Breakdown",
    "metricReference": "reach + campaign_name",
    "notes": "Approved medium Bar Chart card."
  },
  {
    "id": "p6-6",
    "platform": "Meta Ads",
    "name": "Reach by Platform",
    "type": "Pie Chart",
    "col": 2,
    "row": 1,
    "w": 2,
    "h": 2,
    "pageId": "p6",
    "section": "Performance Breakdown",
    "metricReference": "reach + publisher_platform",
    "notes": "Approved medium Pie Chart card."
  },
  {
    "id": "p6-7",
    "platform": "Meta Ads",
    "name": "Reach by Country",
    "type": "Bar Chart",
    "col": 0,
    "row": 3,
    "w": 2,
    "h": 2,
    "pageId": "p6",
    "section": "Geographic Analysis",
    "metricReference": "reach + country",
    "notes": "Approved medium Bar Chart card."
  },
  {
    "id": "p6-8",
    "platform": "Meta Ads",
    "name": "Reach by Country",
    "type": "Maps",
    "col": 2,
    "row": 3,
    "w": 2,
    "h": 2,
    "pageId": "p6",
    "section": "Geographic Analysis",
    "metricReference": "reach + geographic location",
    "notes": "Approved medium Maps card."
  },
  {
    "id": "p6-9",
    "platform": "Meta Ads",
    "name": "Campaign Performance",
    "type": "Table",
    "col": 0,
    "row": 5,
    "w": 4,
    "h": 2,
    "pageId": "p6",
    "section": "Campaign Analysis",
    "metricReference": "campaign_name + reach + impressions + clicks + spend",
    "notes": "Approved full-width Campaign Performance table."
  },
  {
    "id": "p8-1",
    "platform": "Facebook Pages (Organic)",
    "name": "Interaction Breakdown",
    "type": "Bar Chart",
    "col": 0,
    "row": 0,
    "w": 2,
    "h": 2,
    "pageId": "p8",
    "section": "Audience & Engagement",
    "metricReference": "Likes, Comments, Shares",
    "notes": "Breakdown of Likes, Comments and Shares."
  },
  {
    "id": "p8-2",
    "platform": "Facebook Pages (Organic)",
    "name": "Followers by Country",
    "type": "Bar Chart",
    "col": 2,
    "row": 0,
    "w": 2,
    "h": 2,
    "pageId": "p8",
    "section": "Audience & Engagement",
    "metricReference": "Followers by country",
    "notes": "Country distribution of Page followers."
  },
  {
    "id": "p8-3",
    "platform": "Facebook Pages (Organic)",
    "name": "Followers",
    "type": "Number",
    "col": 0,
    "row": 2,
    "w": 1,
    "h": 1,
    "pageId": "p8",
    "section": "Summary",
    "metricReference": "page_follows",
    "notes": "Top small-card row."
  },
  {
    "id": "p8-5",
    "platform": "Facebook Pages (Organic)",
    "name": "Page Visits",
    "type": "Number",
    "col": 1,
    "row": 2,
    "w": 1,
    "h": 1,
    "pageId": "p8",
    "section": "Summary",
    "metricReference": "page_views_total",
    "notes": "Retain agreed label; validate current API metric availability."
  },
  {
    "id": "p8-6",
    "platform": "Facebook Pages (Organic)",
    "name": "Page Views",
    "type": "Number",
    "col": 2,
    "row": 2,
    "w": 1,
    "h": 1,
    "pageId": "p8",
    "section": "Summary",
    "metricReference": "page_media_view",
    "notes": "Media views; separate from Page Visits."
  },
  {
    "id": "p8-7",
    "platform": "Facebook Pages (Organic)",
    "name": "Link Clicks",
    "type": "Number",
    "col": 3,
    "row": 2,
    "w": 1,
    "h": 1,
    "pageId": "p8",
    "section": "Summary",
    "metricReference": "post link clicks",
    "notes": "Retain agreed label; aggregate at the selected reporting scope."
  },
  {
    "id": "p8-8",
    "platform": "Facebook Pages (Organic)",
    "name": "Followers by Country",
    "type": "Maps",
    "col": 0,
    "row": 3,
    "w": 2,
    "h": 2,
    "pageId": "p8",
    "section": "Audience & Location",
    "metricReference": "Followers by country / location",
    "notes": "Construct map using geocoded country locations."
  },
  {
    "id": "p8-9",
    "platform": "Facebook Pages (Organic)",
    "name": "Followers by City",
    "type": "Bar Chart",
    "col": 2,
    "row": 3,
    "w": 2,
    "h": 2,
    "pageId": "p8",
    "section": "Audience & Location",
    "metricReference": "Followers by city",
    "notes": "City-level follower distribution."
  },
  {
    "id": "p8-10",
    "platform": "Facebook Pages (Organic)",
    "name": "Post Performance",
    "type": "Table",
    "col": 0,
    "row": 5,
    "w": 4,
    "h": 2,
    "pageId": "p8",
    "section": "Content Performance",
    "metricReference": "Post, Views, Viewers, Likes, Comments, Shares",
    "notes": "Post-level performance table; exclude legacy Impressions."
  },
  {
    "id": "p7-1",
    "platform": "Instagram Professional",
    "name": "Interaction Breakdown",
    "type": "Bar Chart",
    "col": 0,
    "row": 0,
    "w": 2,
    "h": 2,
    "pageId": "p7",
    "section": "Audience & Engagement",
    "metricReference": "Likes, Comments, Shares",
    "notes": "Breakdown of Likes, Comments and Shares."
  },
  {
    "id": "p7-2",
    "platform": "Instagram Professional",
    "name": "Followers by Country",
    "type": "Bar Chart",
    "col": 2,
    "row": 0,
    "w": 2,
    "h": 2,
    "pageId": "p7",
    "section": "Audience & Engagement",
    "metricReference": "Followers by country",
    "notes": "Country distribution of Instagram followers."
  },
  {
    "id": "p7-3",
    "platform": "Instagram Professional",
    "name": "Followers",
    "type": "Number",
    "col": 0,
    "row": 2,
    "w": 1,
    "h": 1,
    "pageId": "p7",
    "section": "Summary",
    "metricReference": "followers_count / follower_count",
    "notes": "Top small-card row."
  },
  {
    "id": "p7-5",
    "platform": "Instagram Professional",
    "name": "Accounts Engaged",
    "type": "Number",
    "col": 1,
    "row": 2,
    "w": 1,
    "h": 1,
    "pageId": "p7",
    "section": "Summary",
    "metricReference": "accounts_engaged",
    "notes": "Replaces Profile Visits in the account-level Default View."
  },
  {
    "id": "p7-6",
    "platform": "Instagram Professional",
    "name": "Views",
    "type": "Number",
    "col": 2,
    "row": 2,
    "w": 1,
    "h": 1,
    "pageId": "p7",
    "section": "Summary",
    "metricReference": "views",
    "notes": "Account-level views."
  },
  {
    "id": "p7-7",
    "platform": "Instagram Professional",
    "name": "Link Clicks",
    "type": "Number",
    "col": 3,
    "row": 2,
    "w": 1,
    "h": 1,
    "pageId": "p7",
    "section": "Summary",
    "metricReference": "profile_links_taps",
    "notes": "Retain agreed Card label and API mapping."
  },
  {
    "id": "p7-8",
    "platform": "Instagram Professional",
    "name": "Followers by Country",
    "type": "Maps",
    "col": 0,
    "row": 3,
    "w": 2,
    "h": 2,
    "pageId": "p7",
    "section": "Audience & Location",
    "metricReference": "Followers by country / location",
    "notes": "Construct map using geocoded country locations."
  },
  {
    "id": "p7-9",
    "platform": "Instagram Professional",
    "name": "Followers by City",
    "type": "Bar Chart",
    "col": 2,
    "row": 3,
    "w": 2,
    "h": 2,
    "pageId": "p7",
    "section": "Audience & Location",
    "metricReference": "Followers by city",
    "notes": "City-level follower distribution."
  },
  {
    "id": "p7-10",
    "platform": "Instagram Professional",
    "name": "Post Performance",
    "type": "Table",
    "col": 0,
    "row": 5,
    "w": 4,
    "h": 2,
    "pageId": "p7",
    "section": "Content Performance",
    "metricReference": "Post, Views, Reach, Likes, Comments, Shares",
    "notes": "Per-media performance table; metric support varies by media type."
  },
  {
    "id": "p10-1",
    "platform": "TikTok Organic",
    "name": "Interaction",
    "type": "Bar Chart",
    "col": 0,
    "row": 0,
    "w": 2,
    "h": 2,
    "pageId": "p10",
    "section": "Medium Cards – Row 1",
    "metricReference": "Likes, Comments, Shares",
    "notes": "Single Medium Card. Number displays total Likes + Comments + Shares; Pie Chart or Bar Chart displays the breakdown."
  },
  {
    "id": "p10-2",
    "platform": "TikTok Organic",
    "name": "Followers by Country",
    "type": "Bar Chart",
    "col": 2,
    "row": 0,
    "w": 2,
    "h": 2,
    "pageId": "p10",
    "section": "Medium Cards – Row 1",
    "metricReference": "Top countries / follower audience distribution",
    "notes": "Country distribution; exact audience basis follows the Accounts API response."
  },
  {
    "id": "p10-3",
    "platform": "TikTok Organic",
    "name": "Followers",
    "type": "Number",
    "col": 0,
    "row": 2,
    "w": 1,
    "h": 1,
    "pageId": "p10",
    "section": "Small Cards",
    "metricReference": "Followers",
    "notes": "Small KPI, period-end/current follower count as returned by the profile insight."
  },
  {
    "id": "p10-4",
    "platform": "TikTok Organic",
    "name": "Profile Views",
    "type": "Number",
    "col": 1,
    "row": 2,
    "w": 1,
    "h": 1,
    "pageId": "p10",
    "section": "Small Cards",
    "metricReference": "Profile Views / profile visits",
    "notes": "Business Suite uses new profile visits over a selected period; exact API response field must be confirmed."
  },
  {
    "id": "p10-5",
    "platform": "TikTok Organic",
    "name": "Video Views",
    "type": "Number",
    "col": 2,
    "row": 2,
    "w": 1,
    "h": 1,
    "pageId": "p10",
    "section": "Small Cards",
    "metricReference": "Video Views",
    "notes": "Period-based account/video views as returned by Accounts Insights; do not use Display API lifetime sum as a date-range total."
  },
  {
    "id": "p10-9",
    "platform": "TikTok Organic",
    "name": "Link Clicks",
    "type": "Number",
    "col": 3,
    "row": 2,
    "w": 1,
    "h": 1,
    "pageId": "p10",
    "section": "Small Cards",
    "metricReference": "Profile link clicks / link clicks",
    "notes": "Fourth approved Small KPI card. Confirm the exact API field and availability for the connected TikTok account."
  },
  {
    "id": "p10-6",
    "platform": "TikTok Organic",
    "name": "Followers by Country",
    "type": "Maps",
    "col": 0,
    "row": 3,
    "w": 2,
    "h": 2,
    "pageId": "p10",
    "section": "Medium Cards – Row 2",
    "metricReference": "Top countries + top cities",
    "notes": "Map derived from geographic audience breakdown via geocoding."
  },
  {
    "id": "p10-7",
    "platform": "TikTok Organic",
    "name": "Followers by City",
    "type": "Bar Chart",
    "col": 2,
    "row": 3,
    "w": 2,
    "h": 2,
    "pageId": "p10",
    "section": "Medium Cards – Row 2",
    "metricReference": "Top cities / follower audience distribution",
    "notes": "Top cities, using the audience basis returned by the API."
  },
  {
    "id": "p10-8",
    "platform": "TikTok Organic",
    "name": "Video Performance",
    "type": "Table",
    "col": 0,
    "row": 5,
    "w": 4,
    "h": 2,
    "pageId": "p10",
    "section": "Large Card",
    "metricReference": "Video, Views, Reach, Likes, Comments, Shares",
    "notes": "Full-width table. Reach and Views remain separate metrics. Only populate fields available from Accounts API response."
  },
  {
    "id": "p11-1",
    "platform": "TikTok Ads",
    "name": "Cost by Campaign",
    "type": "Bar Chart",
    "col": 0,
    "row": 0,
    "w": 2,
    "h": 2,
    "pageId": "p11",
    "section": "Medium Cards – Row 1",
    "metricReference": "spend + campaign_id",
    "notes": "Position 1. Approved Default Page card. Compare campaign spend."
  },
  {
    "id": "p11-2",
    "platform": "TikTok Ads",
    "name": "Click by Campaign",
    "type": "Bar Chart",
    "col": 2,
    "row": 0,
    "w": 2,
    "h": 2,
    "pageId": "p11",
    "section": "Medium Cards – Row 1",
    "metricReference": "clicks + campaign_id",
    "notes": "Position 2. Approved Default Page card. Compare destination clicks by campaign."
  },
  {
    "id": "p11-3",
    "platform": "TikTok Ads",
    "name": "Impressions",
    "type": "Number",
    "col": 0,
    "row": 2,
    "w": 1,
    "h": 1,
    "pageId": "p11",
    "section": "Small Cards",
    "metricReference": "impressions",
    "notes": "Position 3. Approved Default Page card."
  },
  {
    "id": "p11-4",
    "platform": "TikTok Ads",
    "name": "Reach",
    "type": "Number",
    "col": 1,
    "row": 2,
    "w": 1,
    "h": 1,
    "pageId": "p11",
    "section": "Small Cards",
    "metricReference": "reach",
    "notes": "Position 4. Approved Default Page card. UV metric; retrieve through a compatible reporting mode."
  },
  {
    "id": "p11-5",
    "platform": "TikTok Ads",
    "name": "CPC",
    "type": "Number",
    "col": 2,
    "row": 2,
    "w": 1,
    "h": 1,
    "pageId": "p11",
    "section": "Small Cards",
    "metricReference": "cpc",
    "notes": "Position 5. Approved Default Page card. CPC (destination)."
  },
  {
    "id": "p11-6",
    "platform": "TikTok Ads",
    "name": "Cost",
    "type": "Number",
    "col": 3,
    "row": 2,
    "w": 1,
    "h": 1,
    "pageId": "p11",
    "section": "Small Cards",
    "metricReference": "spend",
    "notes": "Position 6. Approved Default Page card."
  },
  {
    "id": "p11-7",
    "platform": "TikTok Ads",
    "name": "Campaign by Country",
    "type": "Bar Chart",
    "col": 0,
    "row": 3,
    "w": 2,
    "h": 2,
    "pageId": "p11",
    "section": "Medium Cards – Row 2",
    "metricReference": "country_code + spend / impressions / clicks; reach where synchronous reporting supports it",
    "notes": "Position 7. Approved Default Page card. Country breakdown."
  },
  {
    "id": "p11-8",
    "platform": "TikTok Ads",
    "name": "Campaign by Country",
    "type": "Maps",
    "col": 2,
    "row": 3,
    "w": 2,
    "h": 2,
    "pageId": "p11",
    "section": "Medium Cards – Row 2",
    "metricReference": "country_code + spend / impressions / clicks; geocoding layer",
    "notes": "Position 8. Approved Default Page card. Geographic location map."
  },
  {
    "id": "p11-9",
    "platform": "TikTok Ads",
    "name": "Campaign Performance",
    "type": "Table",
    "col": 0,
    "row": 5,
    "w": 4,
    "h": 2,
    "pageId": "p11",
    "section": "Large Card",
    "metricReference": "campaign_id + reach / impressions / clicks / spend",
    "notes": "Position 9. Approved Default Page card. Reach requires compatible synchronous reporting; show unavailable if not returned."
  }
]);
  const [metricCellHeight, setMetricCellHeight] = useState(100);
  const [openMetricMenuId, setOpenMetricMenuId] = useState(null);
  const [openTableMetricMenuId, setOpenTableMetricMenuId] = useState(null);
  const [tableMetricSearch, setTableMetricSearch] = useState('');
  const [openTableColumnMenu, setOpenTableColumnMenu] = useState(null);
  const [tableColumnDrag, setTableColumnDrag] = useState(null);
  const tableColumnSuppressClickRef = useRef(false);
  const tableColumnMoveLockRef = useRef(false);
  const tableColumnIndexRef = useRef(0);
  const [metricDragPreview, setMetricDragPreview] = useState(null);
  const draggedNewMetricRef = useRef(null);
  const [metricPendingDelete, setMetricPendingDelete] = useState(null);
  const metricCanvasRef = useRef(null);
  const reportScrollRef = useRef(null);
  const reportPaperRefs = useRef({});
  const metricInteractionRef = useRef(null);
  const metricSuppressClickRef = useRef(false);
  const metricPreviousRectsRef = useRef(null);
  const metricLayoutAnimationRef = useRef(null);
  const tableColumnRectsRef = useRef(null);
  const getAllMetricNodes = () => Object.values(reportPaperRefs.current)
    .filter(Boolean)
    .flatMap((paper) => Array.from(paper.querySelectorAll('[data-metric-id]')));
  const captureMetricRects = () => {
    const nodes = getAllMetricNodes();
    if (!nodes.length) return;
    metricPreviousRectsRef.current = new Map(nodes.map((node) => [node.getAttribute('data-metric-id'), node.getBoundingClientRect()]));
  };
  useEffect(() => {
    const previous = metricPreviousRectsRef.current;
    const nodes = getAllMetricNodes();
    if (previous && nodes.length) {
      metricPreviousRectsRef.current = null;
    }
    const animated = [];
    if (previous && nodes.length) nodes.forEach((node) => {
      const id = node.getAttribute('data-metric-id');
      const before = previous.get(id);
      if (!before) return;
      const after = node.getBoundingClientRect();
      const dx = before.left - after.left;
      const dy = before.top - after.top;
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        node.style.transition = 'none';
        node.style.transform = `translate(${dx}px, ${dy}px)`;
        animated.push(node);
      }
    });
    if (animated.length) {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        animated.forEach((node) => {
          node.style.transition = 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)';
          node.style.transform = 'translate(0, 0)';
        });
      }));
    }

    const previousColumns = tableColumnRectsRef.current;
    if (previousColumns) {
      tableColumnRectsRef.current = null;
      const movedCells = [];
      document.querySelectorAll('[data-table-column-grid] [data-table-col-key]').forEach((node) => {
        const key = `${node.getAttribute('data-table-col-key')}::${node.tagName}::${node.parentElement?.rowIndex ?? -1}`;
        const before = previousColumns.get(key);
        if (!before) return;
        const after = node.getBoundingClientRect();
        const dx = before.left - after.left;
        const dy = before.top - after.top;
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          node.style.transition = 'none';
          node.style.transform = `translate(${dx}px, ${dy}px)`;
          movedCells.push(node);
        }
      });
      if (movedCells.length) requestAnimationFrame(() => requestAnimationFrame(() => {
        movedCells.forEach((node) => {
          node.style.transition = 'transform 280ms cubic-bezier(0.22, 1, 0.36, 1)';
          node.style.transform = 'translate(0, 0)';
        });
      }));
    }
  }, [dashboardMetrics]);
  const [selectedClient, setSelectedClient] = useState(() => { try { return localStorage.getItem('goa:lastSelectedProperty') || 'Prasana Villas Uluwatu'; } catch (_) { return 'Prasana Villas Uluwatu'; } });
  useEffect(() => { try { localStorage.setItem('goa:lastSelectedProperty', selectedClient); } catch (_) {} }, [selectedClient]);
  useEffect(() => { try { localStorage.setItem('goa:lastActiveTab', activeTab); } catch (_) {} }, [activeTab]);
  const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);
  const clientDropdownRef = useRef(null);
  const [activePropertyMenu, setActivePropertyMenu] = useState(null);
  const [propertyAction, setPropertyAction] = useState(null);
  const [propertyNameInput, setPropertyNameInput] = useState('');
  const [propertyLogo, setPropertyLogo] = useState({});
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDeleteAccountConfirm, setShowDeleteAccountConfirm] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState('');
  const [profileSaved, setProfileSaved] = useState(false);
  const [profileFirstName, setProfileFirstName] = useState('Arysta');
  const [profileLastName, setProfileLastName] = useState('Hendrik');
  const [profileEmail, setProfileEmail] = useState('ah@gmail.com');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [appearance, setAppearance] = useState('Light Mode');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [userActionMenuId, setUserActionMenuId] = useState(null);
  const [userRows, setUserRows] = useState([
    { id: 'u1', property: 'Prasana Villas Uluwatu', account: 'Arysta Hendrik', email: 'ah@gmail.com', type: 'Admin', status: 'Active', you: true },
    { id: 'u2', property: 'Prasana Villas Uluwatu', account: 'Hospio Team', name: 'Hospio Team', email: 'marketing@example.com', type: 'Member', status: 'Active' },
    { id: 'u3', property: 'Bumi Kinar Ubud', account: 'Arysta Hendrik', email: 'ah@gmail.com', type: 'Member', status: 'Active', you: true },
    { id: 'u4', property: 'Selong Selo Resort & Villas', account: 'Arysta Hendrik', email: 'ah@gmail.com', type: 'Admin', status: 'Active', you: true },
    { id: 'u5', property: 'Patra Bali', account: 'Arysta Hendrik', email: 'ah@gmail.com', type: 'Admin', status: 'Active', you: true },
    { id: 'u6', property: 'Bumi Kinar Ubud', account: 'Hospio Team', name: 'Hospio Team', email: 'marketing@example.com', type: 'Member', status: 'Pending' },
    { id: 'u7', property: 'Patra Bali', account: 'Hospio Team', name: 'Hospio Team', email: 'marketing@example.com', type: 'Member', status: 'Pending' },
  ]);
  const [billingPlan, setBillingPlan] = useState('Pro');
  const [userSort, setUserSort] = useState({ key: 'property', direction: 'asc' });
  const [billingSort, setBillingSort] = useState({ key: 'property', direction: 'asc' });

  // State untuk dropdown menu Add Page di panel kiri
  const [isAddPageDropdownOpen, setIsAddPageDropdownOpen] = useState(false);
  const [isAddPageSeeMoreOpen, setIsAddPageSeeMoreOpen] = useState(false);
  const [addPageSearch, setAddPageSearch] = useState('');
  const addPageDropdownRef = useRef(null);

  // State untuk modal Add Property kustom
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [newClientInputValue, setNewClientInputValue] = useState('');

  // State untuk modal Delete Report kustom (tabel reports)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);

  // State untuk modal Delete Page kustom (panel kiri dashboard)
  const [isDeletePageModalOpen, setIsDeletePageModalOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState(null);

  // State untuk Inline Rename di Tabel Reports
  const [editingReportId, setEditingReportId] = useState(null);
  const [editingReportNameValue, setEditingReportNameValue] = useState('');

  // State untuk modal Share Report kustom
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [reportToShare, setReportToShare] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  // List client
  const [clientList, setClientList] = useState([
    'Prasana Villas Uluwatu',
    'Bumi Kinar Ubud',
    'Selong Selo Resort & Villas',
    'Patra Bali'
  ]);

  // Billing subscription records are kept per property in this UI prototype.
  const [billingSubscriptions, setBillingSubscriptions] = useState([
    { id: 'sub-1', property: 'Prasana Villas Uluwatu', plan: 'Pro', paymentMethod: 'Not set', expiresOn: '2026-11-16', autoRenewal: false, status: '7 Days Left', statusNote: 'Some integrations will be disabled.' },
    { id: 'sub-2', property: 'Bumi Kinar Ubud', plan: 'Pro', paymentMethod: 'Not set', expiresOn: '2026-12-09', autoRenewal: false, status: 'Active', statusNote: '' },
    { id: 'sub-3', property: 'Selong Selo Resort & Villas', plan: 'Free', paymentMethod: 'Not set', expiresOn: '2026-11-14', autoRenewal: false, status: 'Free Trial · 5 Days Left', statusNote: 'Some integrations will be disabled.' },
    { id: 'sub-4', property: 'Patra Bali', plan: 'Pro', paymentMethod: 'Not set', expiresOn: '', autoRenewal: false, status: 'Active', statusNote: '' },
  ]);
  const [billingActionMenu, setBillingActionMenu] = useState(null);
  const [selectedBillingProperty, setSelectedBillingProperty] = useState('Prasana Villas Uluwatu');
  const [extendingBillingSubscription, setExtendingBillingSubscription] = useState(null);
  const [billingExtensionDuration, setBillingExtensionDuration] = useState('30 days');
  const [editingBillingSubscription, setEditingBillingSubscription] = useState(null);
  const [billingEditForm, setBillingEditForm] = useState({ plan: 'Pro', paymentMethod: 'Not set', expiresOn: '', autoRenewal: false });

  const openBillingEdit = (subscription) => {
    setEditingBillingSubscription(subscription);
    setBillingEditForm({
      plan: subscription.plan,
      paymentMethod: subscription.paymentMethod,
      expiresOn: subscription.expiresOn,
      autoRenewal: subscription.autoRenewal,
    });
    setBillingActionMenu(null);
  };
  const saveBillingEdit = () => {
    if (!editingBillingSubscription) return;
    setBillingSubscriptions(rows => rows.map(row => row.id === editingBillingSubscription.id
      ? { ...row, ...billingEditForm, status: row.status === 'Cancelled' ? 'Active' : row.status }
      : row));
    setEditingBillingSubscription(null);
  };
  const extendBillingSubscription = (subscription, duration = billingExtensionDuration) => {
    const baseDate = subscription.expiresOn ? new Date(`${subscription.expiresOn}T12:00:00`) : new Date();
    if (duration === '1 year') baseDate.setFullYear(baseDate.getFullYear() + 1);
    else baseDate.setDate(baseDate.getDate() + 30);
    const expiresOn = `${baseDate.getFullYear()}-${String(baseDate.getMonth()+1).padStart(2,'0')}-${String(baseDate.getDate()).padStart(2,'0')}`;
    setBillingSubscriptions(rows => rows.map(row => row.id === subscription.id ? { ...row, expiresOn, status: 'Active' } : row));
    setExtendingBillingSubscription(null);
    setBillingActionMenu(null);
  };
  const selectedBillingSubscription = billingSubscriptions.find(row => row.property === selectedBillingProperty) || billingSubscriptions[0] || null;

  // Property access and role are derived from the same User table rows.
  const currentUserEmail = profileEmail.toLowerCase();
  const accessibleProperties = [...new Set(userRows
    .filter(row => row.email.toLowerCase() === currentUserEmail && row.status === 'Active')
    .map(row => row.property))];
  // Account-level Users view includes memberships only from workspaces this account can access.
  const visibleUserRows = userRows.filter(row => accessibleProperties.includes(row.property));
  const activePropertyRole = userRows.find(row =>
    row.email.toLowerCase() === currentUserEmail &&
    row.property === selectedClient &&
    row.status === 'Active'
  )?.type || 'No Access';
  const getCurrentUserRoleForProperty = (property) => userRows.find(row =>
    row.email.toLowerCase() === currentUserEmail && row.property === property && row.status === 'Active'
  )?.type || 'No Access';
  const isActivePropertyUser = activePropertyRole === 'Member';
  
  const getInitialDates = () => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 29);

    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formatDate = (d) => d.toLocaleDateString('en-US', options);

    return {
      range: `${formatDate(start)} – ${formatDate(end)}`,
      start: formatDate(start),
      end: formatDate(end)
    };
  };

  const initialDates = getInitialDates();

  const [dateRange, setDateRange] = useState(initialDates.range);
  const [startDate, setStartDate] = useState(initialDates.start);
  const [endDate, setEndDate] = useState(initialDates.end);
  const [datePreset, setDatePreset] = useState('Last 30 Days');
  
  const dateKey = (date) => Math.floor(new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() / 86400000);
  const [rawStartIndex, setRawStartIndex] = useState(dateKey(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 29)));
  const [rawEndIndex, setRawEndIndex] = useState(dateKey(new Date()));
  
  const [isCompareEnabled, setIsCompareEnabled] = useState(false);
  const [compareMode, setCompareMode] = useState('Last Month');
  const [compareStartDate, setCompareStartDate] = useState('');
  const [compareEndDate, setCompareEndDate] = useState('');

  const [activeCompareInput, setActiveCompareInput] = useState(null);

  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [latestSavedReportName, setLatestSavedReportName] = useState('');

  const [activeMenuReportId, setActiveMenuReportId] = useState(null);
  const [activePageMenuId, setActivePageMenuId] = useState(null);
  
  // State untuk drag vertikal pada panel kiri. Fungsi menu halaman tetap mengikuti Master.
  const [draggedPageId, setDraggedPageId] = useState(null);
  const [dragOverPageId, setDragOverPageId] = useState(null);
  const [dragY, setDragY] = useState(0);
  const [dragInitialOffsetY, setDragInitialOffsetY] = useState(0);
  const [dragBoxWidth, setDragBoxWidth] = useState(0);
  const [dragBoxLeft, setDragBoxLeft] = useState(0);
  const [editingPageId, setEditingPageId] = useState(null);
  const [editingPageTitle, setEditingPageTitle] = useState('');
  const pagesContainerRef = useRef(null);
  const pageItemsRef = useRef({});
  const reportPagesRef = useRef([]);
  const didMovePageRef = useRef(false);

  const [reportName, setReportName] = useState(`${selectedClient} ${dateRange}`);

  useEffect(() => {
    setReportName(`${selectedClient} ${dateRange}`);
  }, [selectedClient, dateRange]);
  
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef(null);

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const datePickerRef = useRef(null);

  const today = new Date();
  const [calendarMonthOffset, setCalendarMonthOffset] = useState(0);
  const calendarStartMonth = new Date(today.getFullYear(), today.getMonth() - 1 + calendarMonthOffset, 1);
  const calendarCurrentMonth = new Date(today.getFullYear(), today.getMonth() + calendarMonthOffset, 1);
  const formatCalendarDate = (date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const formatMonthHeading = (date) => date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const buildMonthDays = (monthDate) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const count = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: count }, (_, i) => {
      const date = new Date(year, month, i + 1);
      return { day: i + 1, month: date.toLocaleDateString('en-US', { month: 'short' }), year, absoluteIndex: dateKey(date), date };
    });
  };
  const firstMonthDays = buildMonthDays(calendarStartMonth);
  const secondMonthDays = buildMonthDays(calendarCurrentMonth);
  const allDays = [...firstMonthDays, ...secondMonthDays];

  const parseDateToIndex = (dateStr) => {
    if (!dateStr) return null;
    const parsed = new Date(dateStr);
    return Number.isNaN(parsed.getTime()) ? null : dateKey(parsed);
  };

  const compareStartIndex = parseDateToIndex(compareStartDate);
  const compareEndIndex = parseDateToIndex(compareEndDate);

  const renderCalendarMonth = (monthDate, days) => {
    const leadingBlanks = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1).getDay();
    return (
      <div className="flex flex-col gap-2" key={`${monthDate.getFullYear()}-${monthDate.getMonth()}`}>
        <div className="grid grid-cols-7 text-center text-xs text-slate-400 font-bold">
          <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
        </div>
        <div className="grid grid-cols-7 text-center gap-y-1 font-medium text-slate-700 text-xs">
          {Array.from({ length: leadingBlanks }, (_, i) => <span key={`blank-${i}`} className="py-1" />)}
          {days.map((item) => {
            const isStart = rawStartIndex === item.absoluteIndex;
            const isEnd = rawEndIndex === item.absoluteIndex;
            const isInBetween = item.absoluteIndex > rawStartIndex && item.absoluteIndex < rawEndIndex;
            const isCompStart = isCompareEnabled && compareStartIndex === item.absoluteIndex;
            const isCompEnd = isCompareEnabled && compareEndIndex === item.absoluteIndex;
            const isCompInBetween = isCompareEnabled && compareStartIndex !== null && compareEndIndex !== null && item.absoluteIndex > compareStartIndex && item.absoluteIndex < compareEndIndex;
            let styleClass = "hover:bg-slate-100 rounded-lg";
            if (isStart && isEnd) styleClass = "bg-blue-600 text-white font-bold rounded-lg shadow-sm";
            else if (isStart) styleClass = "bg-blue-600 text-white font-bold rounded-l-lg";
            else if (isEnd) styleClass = "bg-blue-600 text-white font-bold rounded-r-lg";
            else if (isInBetween) styleClass = "bg-blue-100 text-blue-900 rounded-none font-semibold";
            else if (isCompStart && isCompEnd) styleClass = "bg-rose-400 text-white font-bold rounded-lg shadow-sm";
            else if (isCompStart) styleClass = "bg-rose-400 text-white font-bold rounded-l-lg";
            else if (isCompEnd) styleClass = "bg-rose-400 text-white font-bold rounded-r-lg";
            else if (isCompInBetween) styleClass = "bg-[#fff5f5] text-rose-500 rounded-none font-medium";
            return <span key={item.absoluteIndex} onClick={() => handleDateClick(item)} className={`py-1 cursor-default select-none transition-colors ${styleClass}`}>{item.day}</span>;
          })}
        </div>
      </div>
    );
  };

  const calculateCompareDates = (startStr, endStr, mode) => {
    const startObj = new Date(startStr);
    const endObj = new Date(endStr);
    if (Number.isNaN(startObj.getTime()) || Number.isNaN(endObj.getTime())) {
      return { compStart: startStr, compEnd: endStr };
    }
    const format = (date) => formatCalendarDate(date);
    const shiftMonthClamped = (date, amount) => {
      const target = new Date(date.getFullYear(), date.getMonth() + amount, 1);
      const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
      target.setDate(Math.min(date.getDate(), lastDay));
      return target;
    };
    if (mode === 'Last Month') {
      return { compStart: format(shiftMonthClamped(startObj, -1)), compEnd: format(shiftMonthClamped(endObj, -1)) };
    }
    if (mode === 'Last Year') {
      const compStart = new Date(startObj); compStart.setFullYear(compStart.getFullYear() - 1);
      const compEnd = new Date(endObj); compEnd.setFullYear(compEnd.getFullYear() - 1);
      return { compStart: format(compStart), compEnd: format(compEnd) };
    }
    return { compStart: startStr, compEnd: endStr };
  };

  useEffect(() => {
    if (isCompareEnabled) {
      const comp = calculateCompareDates(startDate, endDate, compareMode);
      setCompareStartDate(comp.compStart);
      setCompareEndDate(comp.compEnd);
    }
  }, [isCompareEnabled]);

  const handlePresetChange = (preset) => {
    setDatePreset(preset);
    const today = new Date();
    let start;
    let end = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (preset === 'This Month') {
      start = new Date(today.getFullYear(), today.getMonth(), 1);
    } else if (preset === 'Last 7 Days') {
      start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
    } else if (preset === 'Last 30 Days') {
      start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 29);
    } else if (preset === 'Custom') {
      return;
    } else {
      return;
    }
    const newStart = formatCalendarDate(start);
    const newEnd = formatCalendarDate(end);
    setStartDate(newStart);
    setEndDate(newEnd);
    setRawStartIndex(dateKey(start));
    setRawEndIndex(dateKey(end));
    if (isCompareEnabled) {
      const modeToUse = compareMode === 'Custom' ? 'Last Month' : compareMode;
      if (compareMode === 'Custom') setCompareMode('Last Month');
      const comp = calculateCompareDates(newStart, newEnd, modeToUse);
      setCompareStartDate(comp.compStart);
      setCompareEndDate(comp.compEnd);
      setActiveCompareInput(null);
    }
  };

  const handleCompareModeChange = (mode) => {
    setCompareMode(mode);
    setActiveCompareInput(null);
    if (mode === 'Custom') {
      setCompareStartDate(startDate);
      setCompareEndDate(endDate);
    } else {
      const comp = calculateCompareDates(startDate, endDate, mode);
      setCompareStartDate(comp.compStart);
      setCompareEndDate(comp.compEnd);
    }
  };

  const handleDateClick = (item) => {
    if (isCompareEnabled && compareMode === 'Custom' && activeCompareInput) {
      const clickedDateStr = `${item.month} ${item.day}, ${item.year}`;
      if (activeCompareInput === 'start') {
        setCompareStartDate(clickedDateStr);
        setActiveCompareInput('end');
      } else {
        setCompareEndDate(clickedDateStr);
        setActiveCompareInput(null);
      }
      return;
    }

    setDatePreset('Custom');
    let newStart = startDate;
    let newEnd = endDate;

    if (!startDate || (startDate && endDate && startDate !== endDate && endDate !== '')) {
      setRawStartIndex(item.absoluteIndex);
      setRawEndIndex(item.absoluteIndex);
      newStart = `${item.month} ${item.day}, ${item.year}`;
      newEnd = '';
      setStartDate(newStart);
      setEndDate('');
    } else {
      if (item.absoluteIndex < rawStartIndex) {
        setRawStartIndex(item.absoluteIndex);
        newStart = `${item.month} ${item.day}, ${item.year}`;
        setStartDate(newStart);
      } else {
        setRawEndIndex(item.absoluteIndex);
        newEnd = `${item.month} ${item.day}, ${item.year}`;
        setEndDate(newEnd);
      }

      if (newStart && newEnd && isCompareEnabled) {
        const modeToUse = compareMode === 'Custom' ? 'Last Month' : compareMode;
        if (compareMode === 'Custom') {
          setCompareMode('Last Month');
          setActiveCompareInput(null);
        }
        const comp = calculateCompareDates(newStart, newEnd, modeToUse);
        setCompareStartDate(comp.compStart);
        setCompareEndDate(comp.compEnd);
      }
    }
  };

  const handleApplyDate = () => {
    if (startDate && endDate) {
      setDateRange(`${startDate} – ${endDate}`);
    } else if (startDate) {
      setDateRange(`${startDate} – ${startDate}`);
    }
    setIsDatePickerOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        setIsAccountMenuOpen(false);
      }
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsDatePickerOpen(false);
      }
      if (clientDropdownRef.current && !clientDropdownRef.current.contains(event.target)) {
        setIsClientDropdownOpen(false);
        setActivePropertyMenu(null);
      }
      if (addPageDropdownRef.current && !addPageDropdownRef.current.contains(event.target)) {
        setIsAddPageDropdownOpen(false);
      }
      if (!event.target.closest('.billing-action-container')) {
        setBillingActionMenu(null);
      }
      if (!event.target.closest('.user-action-container')) {
        setUserActionMenuId(null);
      }
      if (!event.target.closest('.report-menu-container')) {
        setActiveMenuReportId(null);
      }
      if (!event.target.closest('.page-menu-container')) {
        setActivePageMenuId(null);
      }
      if (!event.target.closest('[data-metric-menu-container]')) {
        setOpenMetricMenuId(null);
      }
      if (!event.target.closest('[data-table-menu-container]')) {
        setOpenTableMetricMenuId(null);
        setOpenTableColumnMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [reportPages, setReportPages] = useState([
  {
    "id": "p1",
    "title": "Cover Page",
    "active": false
  },
  {
    "id": "p3",
    "title": "Google Analytics",
    "active": true
  },
  {
    "id": "p5",
    "title": "Google Ads",
    "active": false
  },
  {
    "id": "p4",
    "title": "Google Business Profile",
    "active": false
  },
  {
    "id": "p9",
    "title": "YouTube Analytics",
    "active": false
  },
  {
    "id": "p6",
    "title": "Meta Ads",
    "active": false
  },
  {
    "id": "p8",
    "title": "Facebook Pages",
    "active": false
  },
  {
    "id": "p7",
    "title": "Instagram Professional",
    "active": false
  },
  {
    "id": "p10",
    "title": "TikTok Organic",
    "active": false
  },
  {
    "id": "p11",
    "title": "TikTok Ads",
    "active": false
  }
]);

  // Keep the dashboard grid cell height in sync with the currently visible property/page.
  // The canvas ref can be replaced when the property or active page changes, so observe it again
  // after React has committed the new page and after the browser has completed layout.
  const activeReportPageId = reportPages.find((page) => page.active)?.id || reportPages[0]?.id;
  useEffect(() => {
    if (activeTab !== 'dashboard') return;
    let observer = null;
    let cancelled = false;
    let firstFrame = 0;
    let secondFrame = 0;
    const measureCanvas = () => {
      if (cancelled) return;
      const activePaper = activeReportPageId ? reportPaperRefs.current[activeReportPageId] : null;
      const canvas = activePaper?.querySelector('[data-metric-grid]') || metricCanvasRef.current;
      if (!canvas) return;
      const width = canvas.getBoundingClientRect().width || canvas.clientWidth;
      if (width > 0) {
        const nextHeight = Math.max(72, (width - 36) / 6);
        setMetricCellHeight((current) => Math.abs(current - nextHeight) > 0.5 ? nextHeight : current);
      }
    };
    firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        measureCanvas();
        const activePaper = activeReportPageId ? reportPaperRefs.current[activeReportPageId] : null;
        const canvas = activePaper?.querySelector('[data-metric-grid]') || metricCanvasRef.current;
        if (canvas && typeof ResizeObserver !== 'undefined') {
          observer = new ResizeObserver(measureCanvas);
          observer.observe(canvas);
        }
      });
    });
    window.addEventListener('resize', measureCanvas, { passive: true });
    const fontsReady = document.fonts?.ready;
    if (fontsReady && typeof fontsReady.then === 'function') fontsReady.then(measureCanvas);
    return () => {
      cancelled = true;
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      if (observer) observer.disconnect();
      window.removeEventListener('resize', measureCanvas);
    };
  }, [activeTab, selectedClient, activeReportPageId]);

  // Remember only the selected page for navigation continuity; dashboard data remains demo state and resets on refresh.
  const skipPageRestoreSaveRef = useRef(true);
  useEffect(() => {
    try {
      const savedPageId = localStorage.getItem(`goa:lastActivePage:${selectedClient}`);
      if (savedPageId && reportPages.some((page) => page.id === savedPageId)) {
        setReportPages((pages) => pages.map((page) => ({ ...page, active: page.id === savedPageId })));
      }
    } catch (_) {}
    // The persistence effect below skips its first pass, then stores the restored page.
    // Restore once when the app loads; property-specific page is read from local storage.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (skipPageRestoreSaveRef.current) return;
    const activePage = reportPages.find((page) => page.active);
    if (activePage) {
      try { localStorage.setItem(`goa:lastActivePage:${selectedClient}`, activePage.id); } catch (_) {}
    }
  }, [reportPages, selectedClient]);

  // Initial template and one-step history for Restore Default / Restore Last.
  const defaultDashboardRef = useRef(null);
  const currentDashboardRef = useRef(null);
  const lastDashboardRef = useRef(null);
  if (!defaultDashboardRef.current) {
    defaultDashboardRef.current = {
      dashboardMetrics: dashboardMetrics.map((m) => ({ ...m })),
      reportPages: reportPages.map((pg) => ({ ...pg })),
    };
  }
  if (!currentDashboardRef.current) {
    currentDashboardRef.current = {
      dashboardMetrics: dashboardMetrics.map((m) => ({ ...m })),
      reportPages: reportPages.map((pg) => ({ ...pg })),
    };
  }
  useEffect(() => {
    const next = {
      dashboardMetrics: dashboardMetrics.map((m) => ({ ...m })),
      reportPages: reportPages.map((pg) => ({ ...pg })),
    };
    const current = currentDashboardRef.current;
    if (current && (JSON.stringify(current.dashboardMetrics) !== JSON.stringify(next.dashboardMetrics) || JSON.stringify(current.reportPages) !== JSON.stringify(next.reportPages))) {
      lastDashboardRef.current = current;
      currentDashboardRef.current = next;
    }
  }, [dashboardMetrics, reportPages]);

  // Keep dashboard pages and metric layouts isolated per property in this prototype.
  // This is local UI state only; persistence will be moved to Supabase later.
  const propertyDashboardStoreRef = useRef({});
  const latestDashboardStateRef = useRef({
    dashboardMetrics: dashboardMetrics.map((m) => ({ ...m })),
    reportPages: reportPages.map((pg) => ({ ...pg })),
  });
  const lastDashboardPropertyRef = useRef(selectedClient);
  useEffect(() => {
    const cloneDashboard = (value) => ({
      dashboardMetrics: (value?.dashboardMetrics || []).map((metric) => ({ ...metric })),
      reportPages: (value?.reportPages || []).map((page) => ({ ...page })),
    });

    if (lastDashboardPropertyRef.current !== selectedClient) {
      // Save the property being left before loading the newly selected property.
      propertyDashboardStoreRef.current[lastDashboardPropertyRef.current] =
        cloneDashboard(latestDashboardStateRef.current);

      const savedDashboard = propertyDashboardStoreRef.current[selectedClient];
      const nextDashboard = cloneDashboard(savedDashboard || defaultDashboardRef.current);

      lastDashboardPropertyRef.current = selectedClient;
      latestDashboardStateRef.current = cloneDashboard(nextDashboard);
      currentDashboardRef.current = cloneDashboard(nextDashboard);
      lastDashboardRef.current = null;

      setDashboardMetrics(nextDashboard.dashboardMetrics);
      setReportPages(nextDashboard.reportPages);
      setOpenMetricMenuId(null);
      setActivePageMenuId(null);
      setActivePropertyMenu(null);
    } else {
      // Keep the latest edits ready to be saved when the user switches property.
      latestDashboardStateRef.current = {
        dashboardMetrics: dashboardMetrics.map((metric) => ({ ...metric })),
        reportPages: reportPages.map((page) => ({ ...page })),
      };
    }
  }, [selectedClient, dashboardMetrics, reportPages]);

  const restorePageDefault = (page) => {
    const defaults = defaultDashboardRef.current;
    if (!defaults) return;
    setReportPages((current) => {
      const defaultPage = defaults.reportPages.find((item) => item.id === page.id);
      if (!defaultPage) return current;
      return current.map((item) => item.id === page.id ? { ...defaultPage, active: item.active } : item);
    });
    setDashboardMetrics((current) => [
      ...current.filter((metric) => metric.pageId !== page.id),
      ...defaults.dashboardMetrics.filter((metric) => metric.pageId === page.id).map((metric) => ({ ...metric })),
    ]);
    setActivePageMenuId(null);
  };
  const restorePageLast = (page) => {
    const last = lastDashboardRef.current;
    if (!last) { window.alert('No previous dashboard state is available yet.'); setActivePageMenuId(null); return; }
    const lastPage = last.reportPages.find((item) => item.id === page.id);
    if (lastPage) setReportPages((current) => current.map((item) => item.id === page.id ? { ...lastPage, active: item.active } : item));
    setDashboardMetrics((current) => [
      ...current.filter((metric) => metric.pageId !== page.id),
      ...last.dashboardMetrics.filter((metric) => metric.pageId === page.id).map((metric) => ({ ...metric })),
    ]);
    setActivePageMenuId(null);
  };

  // Pointer-based vertical drag from Script B, applied only to the Master page list.
  // Horizontal pointer movement is intentionally ignored; the floating item stays in the sidebar corridor.
  const handlePagePointerDown = (e, page) => {
    if (e.target.closest('.page-menu-container') || e.target.tagName === 'INPUT') return;
    if (e.button !== undefined && e.button !== 0) return;

    const itemEl = pageItemsRef.current[page.id];
    if (!itemEl) return;

    const rect = itemEl.getBoundingClientRect();
    didMovePageRef.current = false;
    setDragBoxWidth(rect.width);
    setDragBoxLeft(rect.left);
    setDragInitialOffsetY(e.clientY - rect.top);
    setDragY(rect.top);
    setDraggedPageId(page.id);
    setDragOverPageId(page.id);
    e.preventDefault();
  };

  useEffect(() => {
    reportPagesRef.current = reportPages;
  }, [reportPages]);

  // Keep the sidebar's active page in sync with the paper currently being viewed.
  useEffect(() => {
    const scroller = reportScrollRef.current;
    if (!scroller || activeTab !== 'dashboard') return;
    let frame = 0;
    const syncActivePage = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollerTop = scroller.getBoundingClientRect().top;
        const activationLine = scrollerTop + Math.min(120, scroller.clientHeight * 0.22);
        let activeId = reportPagesRef.current[0]?.id;
        for (const page of reportPagesRef.current) {
          const paper = reportPaperRefs.current[page.id];
          if (paper && paper.getBoundingClientRect().top <= activationLine) activeId = page.id;
          else if (paper) break;
        }
        if (activeId && reportPagesRef.current.some((page) => page.id === activeId && !page.active)) {
          setReportPages((current) => current.map((page) => ({ ...page, active: page.id === activeId })));
        }
      });
    };
    scroller.addEventListener('scroll', syncActivePage, { passive: true });
    syncActivePage();
    return () => {
      scroller.removeEventListener('scroll', syncActivePage);
      cancelAnimationFrame(frame);
    };
  }, [activeTab, reportPages.length]);

  // Open the report on Google Analytics by default, while keeping every paper mounted.
  const didSetInitialReportPositionRef = useRef(false);
  useEffect(() => {
    if (activeTab !== 'dashboard' || didSetInitialReportPositionRef.current) return;
    const analyticsPage = reportPaperRefs.current['p3'];
    const scroller = reportScrollRef.current;
    if (!analyticsPage || !scroller) return;
    didSetInitialReportPositionRef.current = true;
    requestAnimationFrame(() => {
      scroller.scrollTop = Math.max(0, scroller.scrollTop + analyticsPage.getBoundingClientRect().top - scroller.getBoundingClientRect().top);
    });
  }, [activeTab]);

  useEffect(() => {
    if (!draggedPageId) return;

    const handlePointerMove = (e) => {
      const nextY = e.clientY - dragInitialOffsetY;
      setDragY(nextY);
      if (Math.abs(nextY - (pageItemsRef.current[draggedPageId]?.getBoundingClientRect().top ?? nextY)) > 3) {
        didMovePageRef.current = true;
      }

      const currentPages = reportPagesRef.current;
      const currentIndex = currentPages.findIndex((p) => p.id === draggedPageId);
      if (currentIndex < 0) return;

      // Pick the insertion point using only vertical midpoints of the other page rows.
      const otherPages = currentPages.filter((p) => p.id !== draggedPageId);
      let insertIndex = otherPages.length;
      for (let i = 0; i < otherPages.length; i += 1) {
        const targetEl = pageItemsRef.current[otherPages[i].id];
        if (!targetEl) continue;
        const rect = targetEl.getBoundingClientRect();
        if (e.clientY < rect.top + rect.height / 2) {
          insertIndex = i;
          break;
        }
      }

      const nextPages = [...otherPages];
      nextPages.splice(insertIndex, 0, currentPages[currentIndex]);
      const orderChanged = nextPages.some((p, i) => p.id !== currentPages[i]?.id);
      if (orderChanged) {
        reportPagesRef.current = nextPages;
        setReportPages(nextPages);
        setDragOverPageId(nextPages[Math.min(insertIndex, nextPages.length - 1)]?.id ?? null);
      }
    };

    const handlePointerUp = () => {
      setDraggedPageId(null);
      setDragOverPageId(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [draggedPageId, dragInitialOffsetY]);

  const integrationsList = [
    { id: '1', name: 'Google Analytics', connected: true, svg: <svg className="w-5 h-5" viewBox="0 0 24 24" aria-label="Google Analytics"><path fill="#F9AB00" d="M17.4 2.2a2.4 2.4 0 0 1 4.8 0v19.6h-4.8z"/><path fill="#E37400" d="M9.6 10.1a2.4 2.4 0 0 1 4.8 0v11.7H9.6z"/><circle cx="4.2" cy="19.4" r="2.4" fill="#F9AB00"/></svg> },
    { id: '2', name: 'Google Ads', connected: true, svg: <svg className="w-5 h-5" viewBox="0 0 24 24" aria-label="Google Ads"><path d="M8.3 3.3a3.3 3.3 0 0 1 5.7 0l7.2 12.5a3.3 3.3 0 0 1-5.7 3.3L8.3 6.6a3.3 3.3 0 0 1 0-3.3Z" fill="#4285F4"/><path d="M8.3 3.3a3.3 3.3 0 0 0-5.7 0L.8 6.5a3.3 3.3 0 0 0 5.7 3.3l1.8-3.2a3.3 3.3 0 0 0 0-3.3Z" fill="#FBBC04"/><circle cx="4.2" cy="19.2" r="3.1" fill="#34A853"/></svg> },
    { id: '3', name: 'Google Business Profile', connected: true, svg: <svg className="w-5 h-5" viewBox="0 0 24 24" aria-label="Google Business Profile"><path fill="#4285F4" d="M12 2.2a7 7 0 0 0-7 7c0 5.1 7 12.6 7 12.6s7-7.5 7-12.6a7 7 0 0 0-7-7Z"/><circle cx="12" cy="9.2" r="2.6" fill="white"/></svg> },
    { id: '4', name: 'YouTube Analytics', connected: true, svg: <svg className="w-5 h-5" viewBox="0 0 24 24" aria-label="YouTube"><rect x="1.5" y="5" width="21" height="14" rx="4" fill="#FF0033"/><path d="m10 8.5 6 3.5-6 3.5z" fill="white"/></svg> },
    { id: '5', name: 'Meta Ads', connected: true, svg: <svg className="w-5 h-5" viewBox="0 0 24 24" aria-label="Meta"><path d="M3 16.8C5.2 7.4 8.7 4.1 12 10c3.3-5.9 6.8-2.6 9 6.8" fill="none" stroke="#0866FF" strokeWidth="3.2" strokeLinecap="round"/><path d="M3 16.8c2.2 3.7 5.2 2.5 9-6.8 3.8 9.3 6.8 10.5 9 6.8" fill="none" stroke="#0866FF" strokeWidth="2.2" strokeLinecap="round"/></svg> },
    { id: '6', name: 'Facebook Pages (Organic)', label: 'Facebook Pages', connected: true, svg: <svg className="w-5 h-5" viewBox="0 0 24 24" aria-label="Facebook"><circle cx="12" cy="12" r="11" fill="#0866FF"/><path fill="white" d="M13.7 20v-7h2.4l.4-2.8h-2.8V8.4c0-.8.3-1.4 1.4-1.4h1.5V4.5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.1H8.3V13h2.4v7z"/></svg> },
    { id: '7', name: 'Instagram Professional', connected: true, svg: <svg className="w-5 h-5" viewBox="0 0 24 24" aria-label="Instagram"><defs><linearGradient id="igBrand" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#FFB000"/><stop offset=".5" stopColor="#F00075"/><stop offset="1" stopColor="#7048FF"/></linearGradient></defs><rect x="2" y="2" width="20" height="20" rx="6" fill="url(#igBrand)"/><rect x="6.2" y="6.2" width="11.6" height="11.6" rx="3.4" fill="none" stroke="white" strokeWidth="1.8"/><circle cx="12" cy="12" r="2.7" fill="none" stroke="white" strokeWidth="1.8"/><circle cx="17.2" cy="6.9" r="1" fill="white"/></svg> },
    { id: '8', name: 'TikTok Organic', connected: true, svg: <svg className="w-5 h-5" viewBox="0 0 24 24" aria-label="TikTok"><path fill="#25F4EE" d="M15.8 3c.3 2.3 1.6 3.8 4.2 4v3.2c-1.6.1-3-.4-4.2-1.3v6.4a5.3 5.3 0 1 1-5.3-5.3c.4 0 .8 0 1.2.1v3.3a2.1 2.1 0 1 0 1.1 1.9V3h3z"/><path fill="#FE2C55" d="M14.5 2c.3 2.3 1.6 3.8 4.2 4v2.1c-1.6.1-3-.4-4.2-1.3v6.4a5.3 5.3 0 1 1-5.3-5.3c.4 0 .8 0 1.2.1v2.2a2.1 2.1 0 1 0 1.1 1.9V2h3z"/><path fill="#111827" d="M15.1 2.5c.3 2.3 1.6 3.8 4.2 4v2.1c-1.6.1-3-.4-4.2-1.3v6.4a5.3 5.3 0 1 1-5.3-5.3c.4 0 .8 0 1.2.1v2.2a2.1 2.1 0 1 0 1.1 1.9V2.5h3z"/></svg> },
    { id: '9', name: 'TikTok Ads', connected: true, svg: <svg className="w-5 h-5" viewBox="0 0 24 24" aria-label="TikTok Ads"><path fill="#25F4EE" d="M15.8 3c.3 2.3 1.6 3.8 4.2 4v3.2c-1.6.1-3-.4-4.2-1.3v6.4a5.3 5.3 0 1 1-5.3-5.3c.4 0 .8 0 1.2.1v3.3a2.1 2.1 0 1 0 1.1 1.9V3h3z"/><path fill="#FE2C55" d="M14.5 2c.3 2.3 1.6 3.8 4.2 4v2.1c-1.6.1-3-.4-4.2-1.3v6.4a5.3 5.3 0 1 1-5.3-5.3c.4 0 .8 0 1.2.1v2.2a2.1 2.1 0 1 0 1.1 1.9V2h3z"/><path fill="#111827" d="M15.1 2.5c.3 2.3 1.6 3.8 4.2 4v2.1c-1.6.1-3-.4-4.2-1.3v6.4a5.3 5.3 0 1 1-5.3-5.3c.4 0 .8 0 1.2.1v2.2a2.1 2.1 0 1 0 1.1 1.9V2.5h3z"/></svg> }
  ];

  const metricCatalog = {
  "Google Analytics (GA4)": {
    "Total Users": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Active Users": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "New Users": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Sessions": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Engaged Sessions": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Engagement Rate": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Bounce Rate": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Average Session Duration": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Views": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Views per Session": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Event Count": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Key Events": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Session Key Event Rate": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Total Revenue": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Purchase Revenue": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Transactions": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Traffic Acquisition": [
      "Table",
      "Bar Chart",
      "Pie Chart",
    ],
    "Sessions by Source": [
      "Bar Chart",
      "Pie Chart",
      "Table",
    ],
    "Top Landing Pages": [
      "Table",
      "Bar Chart",
      "Pie Chart",
    ],
    "Views by Page": [
      "Bar Chart",
      "Table",
      "Pie Chart",
    ],
    "Total Users by Country": [
      "Pie Chart",
      "Bar Chart",
      "Table",
      "Map",
    ],

    "Users by Device Category": [

      "Pie Chart",

      "Bar Chart",

      "Table",

    ],
    "Sessions by Campaign": [
      "Bar Chart",
      "Table",
      "Pie Chart",
    ],
  },
  "Google Ads": {
    "Clicks by Campaign": [
      "Bar Chart",
      "Table",
      "Pie Chart",
    ],
    "Clicks by Network": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Clicks": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Impressions": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Average CPC": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Amount Spent": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "CPC by Campaign": [
      "Bar Chart",
      "Table",
    ],
    "Cost by Campaign": [
      "Bar Chart",
      "Table",
      "Pie Chart",
    ],
    "Landing Page": [
      "Bar Chart",
      "Pie Chart",
      "Table",
    ],
    "Sitelink": [
      "Bar Chart",
      "Pie Chart",
      "Table",
    ],
    "Keyword": [
      "Bar Chart",
      "Pie Chart",
      "Table",
    ],
    "Campaign by Country": [
      "Bar Chart",
      "Table",
      "Map",
    ],

    "Campaign Performance": [
      "Table",
    ],
    "Average CPM": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Interactions": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Interaction Rate": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Engagements": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Engagement Rate": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Conversions": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Conversion Rate": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Cost per Conversion": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Conversion Value": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "ROAS": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "All Conversions": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Search Impression Share": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Search Lost IS (Budget)": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Search Lost IS (Rank)": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Search Top Impression Share": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Search Absolute Top Impression Share": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Video Views": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Bar Chart",
      "Table",
    ],
    "Video View Rate": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Average CPV": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Video Completion": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "View-through Conversions": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Average Frequency": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Clicks by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],
    "Impressions by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],
    "CTR by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],
    "Average CPC by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],
    "Conversions by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],
    "Conversion Rate by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],
    "Cost per Conversion by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],
    "Conversion Value by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],
    "All Conversions by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],
    "Average CPM by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],
    "Interactions by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],
    "Interaction Rate by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],
    "Engagements by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],
    "Engagement Rate by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],
    "Video Views by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],
    "Video View Rate by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],
    "Average CPV by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],
    "View-through Conversions by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],
    "Sitelink Performance": [
      "Bar Chart",
      "Pie Chart",
      "Table",
    ],
    "Keyword Performance": [
      "Bar Chart",
      "Pie Chart",
      "Table",
    ],
  },
  "Google Business Profile": {
    "Search Impressions (Desktop)": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Search Impressions (Mobile)": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Maps Impressions (Desktop)": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Maps Impressions (Mobile)": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Overview": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Website Clicks": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Direction Requests": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Call Clicks": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Device": [
      "Bar Chart",
      "Pie Chart",
      "Table",
    ],
    "Views: Maps vs Search": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Search Keywords": [
      "Table",
      "Bar Chart",
      "Pie Chart",
    ],
    "Messaging Clicks": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Bookings": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Food Menu Clicks": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Reviews": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
  },
  "YouTube Analytics": {
    "Views": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Engaged Views": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Watch Time": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Average View Duration": [
      "Number",
      "Line Chart",
      "Table",
    ],
    "Average View Percentage": [
      "Number",
      "Line Chart",
      "Table",
    ],
    "Subscribers Gained": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Subscribers Lost": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Net Subscribers": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Earn": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Interaction": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Views by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],
    "Watch Time by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],
    "Views by Top Videos": [
      "Bar Chart",
      "Table",
      "Pie Chart",
    ],
    "Watch Time by Top Videos": [
      "Bar Chart",
      "Table",
      "Pie Chart",
    ],
    "Video Engagement": [
      "Table",
    ],
    "Each Video Insight": [
      "Table",
    ],
    "Views by Traffic Source": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Watch Time by Traffic Source": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Views by Device": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Watch Time by Device": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Views by Subscription Status": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Views by Content Type": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Views by Playback Location": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
  },
  "Meta Ads": {
    "Impressions": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Impressions by Platform": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Impressions by Campaign": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Impressions by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],

    "Reach": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Reach by Platform": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Reach by Campaign": [
      "Bar Chart",
      "Table",
    ],
    "Reach by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],

    "Frequency": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Frequency by Platform": [
      "Bar Chart",
      "Table",
    ],
    "Frequency by Campaign": [
      "Bar Chart",
      "Table",
    ],
    "Frequency by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],

    "Total Spent": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Spend by Platform": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Spend by Campaign": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Spend by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],

    "Clicks": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Clicks by Platform": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Clicks by Campaign": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Clicks by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],

    "Link Clicks": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Link Clicks by Platform": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Link Clicks by Campaign": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Link Clicks by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],

    "CTR": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "CTR by Platform": [
      "Bar Chart",
      "Table",
    ],
    "CTR by Campaign": [
      "Bar Chart",
      "Table",
    ],
    "CTR by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],

    "Average CPC": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Average CPC by Platform": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Average CPC by Campaign": [
      "Bar Chart",
      "Table",
    ],
    "Average CPC by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],

    "CPM": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "CPM by Platform": [
      "Bar Chart",
      "Table",
    ],
    "CPM by Campaign": [
      "Bar Chart",
      "Table",
    ],
    "CPM by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],

    "Result": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Result by Platform": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Result by Campaign": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Result by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],

    "Cost per Result": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Cost per Result by Platform": [
      "Bar Chart",
      "Table",
    ],
    "Cost per Result by Campaign": [
      "Bar Chart",
      "Table",
    ],
    "Cost per Result by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],

    "Purchases": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Purchases by Platform": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Purchases by Campaign": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Purchases by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],

    "Purchase Conversion Value": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Purchase Value by Platform": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Purchase Value by Campaign": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Purchase Value by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],

    "ROAS": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "ROAS by Platform": [
      "Bar Chart",
      "Table",
    ],
    "ROAS by Campaign": [
      "Bar Chart",
      "Table",
    ],
    "ROAS by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],

    "Campaign Performance": [
      "Table",
    ],
    "Campaign Results": [
      "Bar Chart",
      "Table",
      "Pie Chart",
    ],
    "Placement Performance": [
      "Table",
    ],
    "Result by Placement": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Age & Gender Performance": [
      "Table",
    ],
    "Result by Age": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Result by Gender": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Click by Country": [
      "Bar Chart",
      "Map",
      "Table",
    ],
  },
  "Facebook Pages (Organic)": {
    "Page Views": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Link Clicks": [
      "Number",
    ],
    "Viewers": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Page Visits": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Followers": [
      "Number",
    ],
    "Post Engagements": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Video Views": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Followers by Country": [
      "Pie Chart",
      "Bar Chart",
      "Table",
      "Map",
    ],
    "Followers by City": [
      "Bar Chart",
      "Table",
      "Pie Chart",
    ],

    "Interaction": [
      "Number",
    ],
    "Interaction Breakdown": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Post Views": [
      "Number",
      "Table",
    ],
    "Post Viewers": [
      "Number",
      "Table",
    ],
    "Post Clicks": [
      "Number",
      "Table",
    ],
    "Post Clicks by Type": [
      "Bar Chart",
      "Pie Chart",
      "Table",
    ],
    "Post Reactions": [
      "Number",
      "Table",
    ],
    "Post Video Views": [
      "Number",
      "Table",
    ],
    "Average Video Watch Time": [
      "Number",
      "Table",
    ],
    "Post Performance": [
      "Table",
    ],
  },
  "Instagram Professional": {
    "Followers": [
      "Number",
    ],
    "Views": [
      "Number",
    ],
    "Reach": [
      "Number",
      "Line Chart",
      "Table",
    ],
    "Accounts Engaged": [
      "Number",
    ],
    "Total Interactions": [
      "Number",
    ],
    "Likes": [
      "Number",
    ],
    "Comments": [
      "Number",
    ],
    "Shares": [
      "Number",
    ],
    "Saves": [
      "Number",
    ],
    "Replies": [
      "Number",
    ],
    "Reposts": [
      "Number",
    ],
    "Follows and Unfollows": [
      "Number",
    ],
    "Link Clicks": [
      "Number",
    ],
    "Followers by Country": [
      "Pie Chart",
      "Bar Chart",
      "Table",
      "Map",
    ],
    "Followers by City": [
      "Bar Chart",
      "Table",
      "Pie Chart",
    ],

    "Engaged Audience by Country": [
      "Pie Chart",
      "Bar Chart",
      "Table",
      "Map",
    ],
    "Engaged Audience by City": [
      "Bar Chart",
      "Table",
      "Pie Chart",
    ],

    "Interaction": [
      "Number",
    ],
    "Interaction Breakdown": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Post Performance": [
      "Table",
    ],
    "Post Views": [
      "Number",
      "Table",
    ],
    "Post Reach": [
      "Number",
      "Table",
    ],
    "Post Likes": [
      "Number",
      "Table",
    ],
    "Post Comments": [
      "Number",
      "Table",
    ],
    "Post Saves": [
      "Number",
      "Table",
    ],
    "Post Shares": [
      "Number",
      "Table",
    ],
    "Post Interactions": [
      "Number",
      "Table",
    ],
    "Follows from Content": [
      "Number",
      "Table",
    ],
    "Profile Visits from Content": [
      "Number",
      "Table",
    ],
    "Profile Activity from Content": [
      "Bar Chart",
      "Table",
      "Pie Chart",
    ],
    "Average Reels Watch Time": [
      "Number",
      "Table",
    ],
    "Reels Watch Time": [
      "Number",
      "Table",
    ],
    "Story Navigation": [
      "Bar Chart",
      "Table",
      "Pie Chart",
    ],
    "Story Replies from Content": [
      "Number",
      "Table",
    ],
  },
  "TikTok Organic": {
    "Followers": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "New Followers": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "New Likes": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Profile Views": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Video Views": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Reach": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Likes": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Comments": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Shares": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Audience by Gender": [
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Audience by Age": [
      "Bar Chart",
      "Table",
      "Pie Chart",
    ],
    "Followers by Country": [
      "Pie Chart",
      "Bar Chart",
      "Table",
      "Map",
    ],
    "Followers by City": [
      "Bar Chart",
      "Table",
      "Pie Chart",
    ],
    "Audience Activity": [
      "Bar Chart",
      "Table",
    ],
    "Interaction": [
      "Number",
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],

    "Video Performance": [
      "Table",
    ],
    "Video, Video Views": [
      "Bar Chart",
      "Table",
      "Pie Chart",
    ],
    "Video, Likes, Comments, Shares": [
      "Bar Chart",
      "Table",
      "Pie Chart",
    ],
    "Total Interactions": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Engagement Rate by Views": [
      "Bar Chart",
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Like Rate by Views": [
      "Bar Chart",
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Comment Rate by Views": [
      "Bar Chart",
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Share Rate by Views": [
      "Bar Chart",
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Average Views per Video": [
      "Number",
      "Bar Chart",
      "Number and Chart",
      "Table",
    ],
    "Average Reach per Video": [
      "Number",
      "Bar Chart",
      "Number and Chart",
      "Table",
    ],
    "Follower Growth Rate": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Average Interactions per Video": [
      "Number",
      "Bar Chart",
      "Number and Chart",
      "Table",
    ],
    "Views per Reached User": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Top Videos by Likes": [
      "Bar Chart",
      "Table",
      "Pie Chart",
    ],
    "Top Videos by Comments": [
      "Bar Chart",
      "Table",
      "Pie Chart",
    ],
    "Top Videos by Shares": [
      "Bar Chart",
      "Table",
      "Pie Chart",
    ],
    "Top Videos by Reach": [
      "Bar Chart",
      "Table",
      "Pie Chart",
    ],
    "Top Videos by Engagement Rate": [
      "Bar Chart",
      "Table",
    ],
    "Video Engagement Overview": [
      "Table",
      "Bar Chart",
      "Pie Chart",
    ],
    "Link Clicks": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
  },
  "TikTok Ads": {
    "Impressions": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Bar Chart",
      "Table",
    ],
    "Reach": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Bar Chart",
      "Table",
    ],
    "Frequency": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Gross Impressions": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Clicks": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Bar Chart",
      "Table",
    ],
    "CPC": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "CPM": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "CTR": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Cost": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Cost per 1,000 People Reached": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Conversions": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Bar Chart",
      "Table",
    ],
    "Cost per Conversion": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Conversion Rate": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Conversion Rate (Impressions)": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Real-time Conversions": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Real-time Cost per Conversion": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Real-time Conversion Rate": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Real-time Conversion Rate (Impressions)": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Results": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Bar Chart",
      "Table",
    ],
    "Cost per Result": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Result Rate": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Real-time Results": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Real-time Cost per Result": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Real-time Result Rate": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Video Views": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Bar Chart",
      "Table",
    ],
    "2-Second Video Views": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "6-Second Video Views": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Average Video Play Time": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Video Views at 25%": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Video Views at 50%": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Video Views at 75%": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Video Views at 100%": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "6-Second Focused Views": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "15-Second Focused Views": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Music Clicks": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Paid Follows": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Paid Likes": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Paid Comments": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Paid Shares": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Paid Profile Visits": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Paid Profile Visit Rate": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "LIVE Product Clicks": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "App Installs": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Cost per App Install": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Real-time App Installs": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Real-time Cost per App Install": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Registrations": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Cost per Registration": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Registration Rate": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Purchases": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Cost per Purchase": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Purchase Rate": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Landing Page Views": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Cost per Landing Page View": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Landing Page View Rate": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "SKAN Conversions": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "SKAN Cost per Conversion": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "SKAN Conversion Rate": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "SKAN App Installs": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "SKAN Cost per App Install": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "SKAN App Installs (Privacy Withheld)": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Instant Experience Page Views": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Instant Experience Outbound Clicks": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Instant Experience Product Clicks": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Instant Form Submissions": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "App Store Clicks": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Complete Payments (Website)": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Cost per Complete Payment (Website)": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Complete Payment Rate (Website)": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Website Button Clicks": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Cost per Website Button Click": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Website Button Click Rate": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Website Contacts": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Cost per Website Contact": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Website Contact Rate": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Website Form Submissions": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Cost per Website Form Submission": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Website Form Submission Rate": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Website Downloads": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Cost per Website Download": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Website Download Rate": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "TikTok Shop Product Page Views": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Cost per TikTok Shop Product Page View": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "TikTok Shop Add to Cart": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Cost per TikTok Shop Add to Cart": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "TikTok Shop Initiated Checkouts": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Cost per TikTok Shop Initiated Checkout": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "TikTok Shop Purchases": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Cost per TikTok Shop Purchase": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "TikTok Shop Gross Revenue": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "TikTok Shop Average Order Value": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "TikTok Shop ROAS": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "TikTok Shop Add to Wishlist": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Cost per TikTok Shop Add to Wishlist": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "TikTok Shop Wishlist Value": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "TikTok Shop Checkout Value": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "TikTok Shop Product Page View Value": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "TikTok Shop Add to Cart Value": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "TikTok Instant Experience Page Views": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Instant Experience Average View Time": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Instant Experience Average View Percentage": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Instant Experience Video Views": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Instant Experience Video Views at 25%": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Instant Experience Video Views at 50%": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Instant Experience Video Views at 75%": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Instant Experience Video Views at 100%": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Engagements": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Engagement Rate": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Cost per Engagement": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Video Completion Rate": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "2-Second View Rate": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "6-Second View Rate": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Average Cost per Video View": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Cost per 1,000 Video Views": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Landing Page View per Click Rate": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Average Revenue per Purchase": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Cost by Campaign": [
      "Bar Chart",
      "Table",
      "Pie Chart",
    ],
    "Click by Campaign": [
      "Bar Chart",
      "Table",
      "Pie Chart",
    ],
    "Campaign by Country": [
      "Pie Chart",
      "Bar Chart",
      "Table",
      "Map",
    ],

    "Campaign Performance": [
      "Table",
    ],
    "Delivery Overview": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Traffic Overview": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Cost Efficiency": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Conversion Overview": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Video Performance": [
      "Table",
    ],
    "Video Engagement": [
      "Number",
      "Bar Chart",
      "Table",
      "Pie Chart",
    ],
    "Video Retention": [
      "Bar Chart",
      "Table",
    ],
    "Conversion Funnel": [
      "Bar Chart",
      "Table",
    ],
    "App Install Performance": [
      "Number",
      "Line Chart",
      "Table",
    ],
    "Purchase Performance": [
      "Number",
      "Line Chart",
      "Table",
    ],
    "Engagement Breakdown": [
      "Number",
      "Pie Chart",
      "Bar Chart",
      "Table",
    ],
    "Engagement Efficiency": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Video Completion Overview": [
      "Number",
      "Line Chart",
      "Number and Chart",
      "Table",
    ],
    "Landing Page Performance": [
      "Number",
      "Line Chart",
      "Table",
    ],
    "SKAN Performance": [
      "Number",
      "Line Chart",
      "Table",
    ],
    "Instant Experience Performance": [
      "Number",
      "Bar Chart",
      "Table",
      "Pie Chart",
    ],
    "Instant Form Performance": [
      "Number",
      "Line Chart",
      "Table",
    ],
    "Website Lead Generation": [
      "Number",
      "Line Chart",
      "Table",
    ],
    "Website Conversion Performance": [
      "Number",
      "Line Chart",
      "Table",
    ],
    "Website Action Performance": [
      "Number",
      "Bar Chart",
      "Table",
      "Pie Chart",
    ],
    "TikTok Shop Funnel": [
      "Bar Chart",
      "Table",
    ],
    "TikTok Shop Revenue Performance": [
      "Number",
      "Line Chart",
      "Table",
    ],
    "TikTok Shop Cart Efficiency": [
      "Number",
      "Line Chart",
      "Table",
    ],
    "TikTok Shop Checkout Efficiency": [
      "Number",
      "Line Chart",
      "Table",
    ],
    "TikTok Shop Wishlist Performance": [
      "Number",
      "Line Chart",
      "Table",
    ],
    "Instant Experience Engagement": [
      "Number",
      "Line Chart",
      "Table",
    ],
    "Instant Experience Video Retention": [
      "Bar Chart",
      "Table",
    ],
    "App Install Funnel": [
      "Number",
      "Line Chart",
      "Table",
    ],
    "Website Revenue Efficiency": [
      "Number",
      "Line Chart",
      "Table",
    ],
  }
};
  const getMetricCatalogPlatform = (platform) => {
    const aliases = { 'Google Analytics': 'Google Analytics (GA4)' };
    return aliases[platform] || platform;
  };
  const getMetricTypeOptions = (platform, name) => metricCatalog[getMetricCatalogPlatform(platform)]?.[name] || [];
  const metricBreakdown = (metric) => {
    const n = metric.name.toLowerCase();
    if (n.includes('country') || n.includes('location') || n.includes('city')) return [
      { label: 'Indonesia', value: 58 }, { label: 'Australia', value: 18 }, { label: 'United States', value: 14 }, { label: 'Singapore', value: 10 }
    ];
    if (n.includes('campaign')) return [
      { label: 'Brand Awareness', value: 86 }, { label: 'Sales Campaign', value: 68 }, { label: 'Retargeting', value: 46 }, { label: 'Profile Visit', value: 29 }
    ];
    if (n.includes('platform')) return [
      { label: 'Facebook', value: 62 }, { label: 'Instagram', value: 34 }, { label: 'WhatsApp', value: 4 }
    ];
    if (n.includes('device')) return [
      { label: 'Mobile', value: 68 }, { label: 'Desktop', value: 24 }, { label: 'Tablet', value: 8 }
    ];
    if (n.includes('source') || n.includes('channel') || n.includes('medium')) return [
      { label: 'Organic Search', value: 92 }, { label: 'Direct', value: 76 }, { label: 'Paid Search', value: 58 }, { label: 'Referral', value: 34 }, { label: 'Social', value: 22 }
    ];
    if (n.includes('video')) return [
      { label: 'Video 1', value: 92 }, { label: 'Video 2', value: 74 }, { label: 'Video 3', value: 51 }, { label: 'Video 4', value: 28 }
    ];
    if (n.includes('interaction') || n.includes('engagement')) return [
      { label: 'Likes', value: 84 }, { label: 'Comments', value: 42 }, { label: 'Shares', value: 26 }
    ];
    return [
      { label: 'Organic', value: 84 }, { label: 'Paid', value: 58 }, { label: 'Other', value: 32 }
    ];
  };
  // Related columns are curated per table card. Only metrics that make sense
  // for that table's platform and reporting dimension are offered.
  const relatedTableMetrics = (metric) => {
    const key = `${metric.platform}|${metric.name}`;
    // Master Metrics workbook is the source of truth for table-specific metric compatibility.
    const masterCardMetrics = {
      "Google Analytics|Traffic Acquisition": [
            "Sessions",
            "Active Users",
            "New Users",
            "Engaged Sessions",
            "Engagement Rate",
            "Key Events",
            "Total Revenue",
          ],
      "Google Analytics|Sessions by Source": [
            "Sessions",
            "Active Users",
            "New Users",
            "Key Events",
            "Total Revenue",
          ],
      "Google Analytics|Top Landing Pages": [
            "Sessions",
            "Active Users",
            "New Users",
            "Key Events",
            "Total Revenue",
          ],
      "Google Analytics|Views by Page": [
            "Views",
            "Event Count",
            "Active Users",
          ],
      "Google Analytics|Total Users by Country": [
            "Total Users",
            "Active Users",
          ],

      "Google Analytics|Users by Device Category": [
            "Total Users",
            "Active Users",
            "Sessions",
          ],
      "Google Analytics|Sessions by Campaign": [
            "Sessions",
            "Active Users",
            "New Users",
            "Engaged Sessions",
            "Key Events",
            "Total Revenue",
          ],
      "Google Ads|Landing Page": [
            "Clicks",
            "Impressions",
            "CTR",
            "Average CPC",
            "Cost",
            "Conversions",
            "Conversion Rate",
            "Conversion Value",
            "All Conversions",
            "Cost per Conversion",
            "View-through Conversions",
          ],
      "Google Ads|Sitelink": [
            "Clicks",
            "Impressions",
            "CTR",
            "Average CPC",
            "Cost",
            "Conversions",
            "Conversion Value",
            "All Conversions",
          ],
      "Google Ads|Keyword": [
            "Clicks",
            "Impressions",
            "CTR",
            "Average CPC",
            "Cost",
            "Conversions",
            "Conversion Rate",
            "Conversion Value",
            "All Conversions",
            "Cost per Conversion",
            "Search Impression Share",
            "Search Lost IS (Budget)",
            "Search Lost IS (Rank)",
            "Search Top Impression Share",
            "Search Absolute Top Impression Share",
          ],
      "Google Ads|Campaign by Country": [
            "Clicks",
            "Impressions",
            "CTR",
            "Cost",
            "Conversions",
            "Conversion Value",
          ],
      "Google Ads|Campaign Performance": [
            "Clicks",
            "Impressions",
            "CTR",
            "Average CPC",
            "Cost",
            "Conversions",
            "Conversion Rate",
            "Conversion Value",
            "Conversion Value per Cost (ROAS)",
            "All Conversions",
            "Cost per Conversion",
            "Search Impression Share",
            "Search Lost IS (Budget)",
            "Search Lost IS (Rank)",
            "Search Top Impression Share",
            "Search Absolute Top Impression Share",
            "Interactions",
            "Interaction Rate",
            "Engagements",
            "Engagement Rate",
            "Video Views",
            "Video View Rate",
            "Average CPV",
            "View-through Conversions",
          ],
      "Google Ads|Video Completion": [
            "Video Played to 25%",
            "Video Played to 50%",
            "Video Played to 75%",
            "Video Played to 100%",
          ],
      "YouTube Analytics|Net Subscribers": [
            "Subscribers Gained",
            "Subscribers Lost",
          ],
      "YouTube Analytics|Interaction": [
            "Likes",
            "Comments",
            "Shares",
          ],
      "YouTube Analytics|Video Engagement": [
            "Likes",
            "Comments",
            "Shares",
          ],
      "YouTube Analytics|Each Video Insight": [
            "Views",
            "Likes",
            "Shares",
            "Comments",
            "Estimated Revenue",
          ],
      "Facebook Pages (Organic)|Interaction Breakdown": [
            "Likes",
            "Comments",
            "Shares",
          ],
      "Instagram Professional|Interaction Breakdown": [
            "Likes",
            "Comments",
            "Shares",
          ],
      "TikTok Organic|Interaction": [
            "Likes",
            "Comments",
            "Shares",
          ],
      "TikTok Organic|Followers by Country": [
            "Followers by Country",
            "Followers by City",
          ],
      "TikTok Organic|Video Performance": [
            "Video",
            "Video Views",
            "Reach",
            "Likes",
            "Comments",
            "Shares",
          ],
      "TikTok Ads|Cost per 1,000 People Reached": [
            "Cost per 1",
            "000 People Reached",
          ],
      "TikTok Ads|Conversion Rate": [
            "Conversion Rate (CVR",
            "Clicks)",
          ],
      "TikTok Ads|Real-time Conversion Rate": [
            "Real-time Conversion Rate (CVR",
            "Clicks)",
          ],
      "TikTok Ads|Real-time Conversion Rate (Impressions)": [
            "Real-time Conversion Rate (CVR",
            "Impressions)",
          ],
      "TikTok Ads|Cost per 1,000 Video Views": [
            "Cost per 1",
            "000 Video Views",
          ],
      "TikTok Organic|Top Videos by Likes": [
            "Video",
            "Likes",
          ],
      "TikTok Organic|Top Videos by Comments": [
            "Video",
            "Comments",
          ],
      "TikTok Organic|Top Videos by Shares": [
            "Video",
            "Shares",
          ],
      "TikTok Organic|Top Videos by Reach": [
            "Video",
            "Reach",
          ],
      "TikTok Organic|Top Videos by Engagement Rate": [
            "Video",
            "Likes",
            "Comments",
            "Shares",
            "Video Views",
          ],
      "TikTok Organic|Video Engagement Overview": [
            "Video",
            "Video Views",
            "Likes",
            "Comments",
            "Shares",
            "Reach",
          ],
      "Google Ads|Sitelink Performance": [
            "Clicks",
            "Impressions",
            "CTR",
            "Average CPC",
            "Cost",
            "Conversions",
            "Conversion Value",
            "All Conversions",
          ],
      "Google Ads|Keyword Performance": [
            "Clicks",
            "Impressions",
            "CTR",
            "Average CPC",
            "Cost",
            "Conversions",
            "Conversion Rate",
            "Conversion Value",
            "All Conversions",
            "Cost per Conversion",
            "Search Impression Share",
            "Search Lost IS (Budget)",
            "Search Lost IS (Rank)",
            "Search Top Impression Share",
            "Search Absolute Top Impression Share",
          ],
};
    const legacyMap = {
      'Google Analytics|Traffic Acquisition': ['Engaged Sessions', 'Engagement Rate', 'Event Count', 'Key Events', 'Average Engagement Time'],
      'Google Analytics|Top Landing Pages': ['Views per User', 'Engagement Rate', 'Entrances', 'Exits', 'Key Events'],
      'Google Ads|Landing Page': ['Clicks', 'Impressions', 'CTR', 'Average CPC', 'Conversions', 'Cost'],
      'Google Ads|Sitelink Performance': ['Conversions', 'Conversion Rate', 'Average CPC', 'Cost per Conversion'],
      'Google Ads|Keyword Performance': ['Average CPC', 'Cost', 'Conversions', 'Conversion Rate', 'Quality Score', 'Cost per Conversion'],
      'Google Ads|Campaign Performance': ['Clicks', 'Impressions', 'CTR', 'Average CPC', 'Cost', 'Conversions', 'Conversion Rate', 'Conversion Value', 'Conversion Value per Cost (ROAS)', 'All Conversions', 'Cost per Conversion', 'Search Impression Share', 'Search Lost IS (Budget)', 'Search Lost IS (Rank)', 'Search Top Impression Share', 'Search Absolute Top Impression Share', 'Interactions', 'Interaction Rate', 'Engagements', 'Engagement Rate', 'Video Views', 'Video View Rate', 'Average CPV', 'View-through Conversions'],
      'Meta Ads|Campaign Performance': ['Reach', 'Impressions', 'Clicks', 'Cost', 'CTR', 'Average CPC', 'CPM', 'Frequency', 'Results', 'Cost per Result', 'Conversions', 'Conversion Rate', 'Conversion Value', 'ROAS', 'Link Clicks', 'Landing Page Views', 'Post Engagements', 'Video Views'],
      'Google Business Profile|Search Keywords': ['Monthly search keyword impressions'],
      'YouTube Analytics|Each Video Insight': ['Watch Time', 'Average View Duration', 'Likes', 'Comments', 'Subscribers Gained', 'Impressions'],
      'Facebook Pages (Organic)|Post Performance': ['Views', 'Viewers', 'Likes', 'Comments', 'Shares', 'Engagement', 'Reactions', 'Link Clicks'],
      'Instagram Professional|Post Performance': ['Reach', 'Impressions', 'Likes', 'Comments', 'Saves', 'Shares', 'Engagement Rate'],
      'TikTok Organic|Video Performance': ['Reach', 'Likes', 'Comments', 'Shares', 'Average Watch Time', 'Completion Rate'],
      'TikTok Ads|Campaign Performance': ['CTR', 'Average CPC', 'Conversions', 'Conversion Rate', 'Cost per Conversion'],
    };
    const sourceList = masterCardMetrics[key] || legacyMap[key] || [];
    // Existing metric columns intentionally remain selectable, so clients can add duplicates.
    const currentTable = metricTable(metric);
    const currentColumns = (currentTable.headers || []).slice(1).filter((name) => name && name !== '+');
    return [...new Set([...sourceList, ...currentColumns])].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base', numeric: true }));
  };
  const relatedMetricSampleValues = (metric, metricName, rowIndex) => {
    const values = {
      'CTR': ['2.84%', '2.61%', '2.37%', '1.98%', '1.76%'],
      'Average CPC': ['Rp1,240', 'Rp1,380', 'Rp1,510', 'Rp1,620', 'Rp1,740'],
      'Cost': ['Rp158,420', 'Rp124,760', 'Rp87,060', 'Rp64,940', 'Rp52,310'],
      'Conversions': ['284', '216', '174', '128', '96'],
      'Conversion Rate': ['5.88%', '5.93%', '6.19%', '6.60%', '4.95%'],
      'Cost per Conversion': ['Rp18,420', 'Rp19,760', 'Rp21,060', 'Rp24,940', 'Rp22,310'],
      'Impressions': ['251,729', '216,687', '169,760', '134,723', '98,560'],
      'Clicks': ['4,820', '3,640', '2,810', '1,940', '1,520'],
      'Reach': ['188,450', '146,210', '98,340', '72,180', '64,702'],
      'Engagement Rate': ['6.42%', '5.81%', '5.24%', '4.96%', '4.38%'],
      'Engaged Sessions': ['3,247', '1,764', '995', '5,883', '2,100'],
      'Event Count': ['12,480', '9,320', '7,840', '5,210', '3,940'],
      'Key Events': ['842', '624', '518', '386', '240'],
      'Average Engagement Time': ['2m 14s', '1m 42s', '2m 07s', '3m 06s', '2m 31s'],
      'Views per User': ['3.38', '2.94', '2.61', '2.42', '2.18'],
      'Entrances': ['2,840', '1,920', '1,410', '1,120', '860'],
      'Exits': ['1,420', '980', '740', '620', '510'],
      'Searches': ['1,248', '842', '624', '428', '312'],
      'Search Views': ['8,420', '6,810', '5,620', '3,940', '2,860'],
      'Website Clicks': ['842', '624', '518', '386', '240'],
      'Calls': ['128', '96', '82', '64', '42'],
      'Direction Requests': ['284', '216', '174', '128', '96'],
      'Watch Time': ['1,248 hrs', '984 hrs', '842 hrs', '624 hrs', '518 hrs'],
      'Average View Duration': ['2:14', '1:42', '2:07', '3:06', '2:31'],
      'Likes': ['842', '624', '518', '386', '240'],
      'Comments': ['64', '42', '38', '24', '18'],
      'Subscribers Gained': ['128', '96', '82', '64', '42'],
      'Engagement': ['1,248', '984', '842', '624', '518'],
      'Reactions': ['842', '624', '518', '386', '240'],
      'Shares': ['128', '96', '82', '64', '42'],
      'Link Clicks': ['284', '216', '174', '128', '96'],
      'Saves': ['312', '248', '196', '142', '108'],
      'Average Watch Time': ['8.4s', '7.8s', '7.2s', '6.9s', '6.2s'],
      'Completion Rate': ['42.8%', '38.6%', '34.2%', '29.8%', '26.4%'],
      'Quality Score': ['8/10', '7/10', '9/10', '6/10', '8/10'],
      'Views': ['12,480', '9,320', '7,840', '5,210', '3,940'],
      'Active Users': ['3,247', '1,764', '995', '5,883', '2,100'],
      'New Users': ['2,188', '1,018', '694', '3,880', '1,760'],
    };
    return (values[metricName] || ['1,248', '984', '842', '624', '518'])[rowIndex % 5];
  };
  const addRelatedTableMetric = (metric, metricName) => {
    setDashboardMetrics((current) => current.map((item) => {
      if (item.id !== metric.id) return item;
      const base = metricTable(item);
      const headers = [...base.headers, metricName];
      const rows = base.rows.map((row, index) => [...row, relatedMetricSampleValues(item, metricName, index)]);
      return { ...item, relatedTableMetrics: [...(item.relatedTableMetrics || []), metricName], tableDataOverride: { headers, rows } };
    }));
    setTableMetricSearch('');
    setOpenTableMetricMenuId(null);
  };
  const parseTableSortValue = (raw) => {
    const value = String(raw ?? '').trim();
    if (!value) return { kind: 'empty', value: '' };
    const dateLike = /^(?:\d{1,2}\s+[A-Za-z]{3,9}\s+\d{4}|\d{4}[-/]\d{1,2}[-/]\d{1,2}|[A-Za-z]{3,9}\s+\d{1,2},?\s+\d{4})$/i.test(value);
    if (dateLike) {
      const timestamp = Date.parse(value);
      if (Number.isFinite(timestamp)) return { kind: 'date', value: timestamp };
    }
    const duration = value.match(/^(?:(\d+)m\s*)?(?:(\d+(?:\.\d+)?)s)?$/i);
    if (duration && (duration[1] || duration[2])) return { kind: 'number', value: Number(duration[1] || 0) * 60 + Number(duration[2] || 0) };
    const clockDuration = value.match(/^(\d+):(\d{1,2})$/);
    if (clockDuration) return { kind: 'number', value: Number(clockDuration[1]) * 60 + Number(clockDuration[2]) };
    const ratio = value.match(/^(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/);
    if (ratio) return { kind: 'number', value: Number(ratio[1]) / Number(ratio[2] || 1) };
    const normalized = value.replace(/[^0-9,.-]/g, '').replace(/,(?=\d{3}(?:\D|$))/g, '');
    const number = Number(normalized);
    if (normalized !== '' && Number.isFinite(number)) return { kind: 'number', value: number };
    return { kind: 'text', value };
  };
  const tableColumnSortMode = (table, columnIndex) => {
    const header = String(table.headers?.[columnIndex] || '').toLowerCase();
    if (/date|day|week|month|year|published|created|updated/.test(header)) return 'date';
    const samples = (table.rows || []).map((row) => parseTableSortValue(row[columnIndex])).filter((item) => item.kind !== 'empty');
    if (samples.length && samples.every((item) => item.kind === 'date')) return 'date';
    if (samples.length && samples.every((item) => item.kind === 'number')) return 'number';
    return 'text';
  };
  const tableSortOptions = (table, columnIndex) => {
    const mode = tableColumnSortMode(table, columnIndex);
    if (mode === 'date') return [{ label: 'Newest to Oldest', direction: 'desc' }, { label: 'Oldest to Newest', direction: 'asc' }];
    if (mode === 'number') return [{ label: 'Highest to Lowest', direction: 'desc' }, { label: 'Lowest to Highest', direction: 'asc' }];
    return [{ label: 'A–Z', direction: 'asc' }, { label: 'Z–A', direction: 'desc' }];
  };
  const sortTableColumn = (metric, columnIndex, direction) => {
    setDashboardMetrics((current) => current.map((item) => item.id === metric.id ? { ...item, tableSort: { columnIndex, direction } } : item));
    setOpenTableColumnMenu(null);
  };
  const moveTableColumn = (metric, fromIndex, toIndex) => {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) return;
    const tableNode = document.querySelector(`[data-metric-id="${metric.id}"] [data-table-column-grid]`);
    if (tableNode) {
      tableColumnRectsRef.current = new Map(
        Array.from(tableNode.querySelectorAll('[data-table-col-key]')).map((node) => [
          `${node.getAttribute('data-table-col-key')}::${node.tagName}::${node.parentElement?.rowIndex ?? -1}`,
          node.getBoundingClientRect(),
        ])
      );
    }
    setDashboardMetrics((current) => current.map((item) => {
      if (item.id !== metric.id) return item;
      const base = metricTable(item);
      if (fromIndex >= base.headers.length || toIndex >= base.headers.length) return item;
      const move = (values) => {
        const next = [...values];
        const [picked] = next.splice(fromIndex, 1);
        next.splice(toIndex, 0, picked);
        return next;
      };
      return {
        ...item,
        tableDataOverride: {
          headers: move(base.headers),
          rows: base.rows.map((row) => move(row)),
        },
        tableSort: null,
      };
    }));
    setOpenTableColumnMenu(null);
  };
  const startTableColumnPointerDrag = (e, metric, columnIndex, label) => {
    if (e.button !== undefined && e.button !== 0) return;
    // The first column is the row identity (Page, Channel, Campaign...), so it stays fixed.
    if (columnIndex === 0) return;
    const header = e.currentTarget.closest('th');
    if (!header) return;
    const rect = header.getBoundingClientRect();
    tableColumnSuppressClickRef.current = false;
    tableColumnMoveLockRef.current = false;
    tableColumnIndexRef.current = columnIndex;
    setOpenTableColumnMenu(null);
    setOpenTableMetricMenuId(null);
    setTableColumnDrag({ metricId: metric.id, currentIndex: columnIndex, label, startX: e.clientX, pointerX: e.clientX, pointerY: e.clientY, offsetX: Math.min(Math.max(12, e.clientX - rect.left), Math.max(12, rect.width - 12)), width: rect.width, top: rect.top, moved: false });
    e.preventDefault();
  };

  // Match the page-list pointer interaction: the label follows the pointer,
  // while only the horizontal coordinate selects a new column position.
  // A column move is applied once per render: the lock is released after React commits the new order.
  useEffect(() => { tableColumnMoveLockRef.current = false; }, [dashboardMetrics]);
  useEffect(() => {
    if (!tableColumnDrag) return;
    const handlePointerMove = (event) => {
      const drag = tableColumnDrag;
      const table = document.querySelector(`[data-metric-id="${drag.metricId}"] [data-table-column-grid]`);
      if (!table) return;
      const headers = Array.from(table.querySelectorAll('thead th[data-table-column-index]'));
      const from = tableColumnIndexRef.current;
      const moved = drag.moved || Math.abs(event.clientX - drag.startX) > 4;
      let nextIndex = from;
      if (!tableColumnMoveLockRef.current && headers.length > 1 && from < headers.length) {
        // Same idea as the page list: pick the insertion point among the OTHER columns only,
        // using layout positions (offsetLeft) so running animations cannot cause flip-flopping.
        const x = event.clientX - table.getBoundingClientRect().left;
        const others = headers.filter((_, index) => index !== from);
        let insertAt = others.length;
        for (let i = 0; i < others.length; i += 1) {
          if (x < others[i].offsetLeft + others[i].offsetWidth / 2) { insertAt = i; break; }
        }
        nextIndex = Math.max(1, Math.min(headers.length - 1, insertAt));
      }
      if (nextIndex !== from) {
        const metric = dashboardMetrics.find((item) => item.id === drag.metricId);
        if (metric) {
          tableColumnMoveLockRef.current = true;
          tableColumnIndexRef.current = nextIndex;
          moveTableColumn(metric, from, nextIndex);
        }
        tableColumnSuppressClickRef.current = true;
        setTableColumnDrag((current) => current ? { ...current, currentIndex: tableColumnIndexRef.current, pointerX: event.clientX, pointerY: event.clientY, moved: true } : current);
      } else {
        if (moved) tableColumnSuppressClickRef.current = true;
        setTableColumnDrag((current) => current ? { ...current, pointerX: event.clientX, pointerY: event.clientY, moved } : current);
      }
    };
    const finishPointerDrag = () => setTableColumnDrag(null);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', finishPointerDrag);
    window.addEventListener('pointercancel', finishPointerDrag);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', finishPointerDrag);
      window.removeEventListener('pointercancel', finishPointerDrag);
    };
  }, [tableColumnDrag, dashboardMetrics]);

  const deleteTableColumn = (metric, columnIndex) => {
    // Keep the first column as the row identity (Campaign, Channel, Page, etc.).
    if (columnIndex === 0) return;
    setDashboardMetrics((current) => current.map((item) => {
      if (item.id !== metric.id) return item;
      const base = metricTable(item);
      const removedName = base.headers[columnIndex];
      const headers = base.headers.filter((_, index) => index !== columnIndex);
      const rows = base.rows.map((row) => row.filter((_, index) => index !== columnIndex));
      return { ...item, relatedTableMetrics: (item.relatedTableMetrics || []).filter((name) => name !== removedName), tableDataOverride: { headers, rows }, tableSort: null };
    }));
    setOpenTableColumnMenu(null);
  };
  const sortedMetricTable = (metric) => {
    const base = metricTable(metric);
    if (!metric.tableSort) return base;
    const { columnIndex, direction } = metric.tableSort;
    const rows = [...base.rows].sort((a, b) => {
      const av = parseTableSortValue(a[columnIndex]);
      const bv = parseTableSortValue(b[columnIndex]);
      let result = 0;
      if (av.kind === 'empty' || bv.kind === 'empty') return av.kind === bv.kind ? 0 : (av.kind === 'empty' ? 1 : -1);
      if (av.kind === bv.kind && (av.kind === 'number' || av.kind === 'date')) result = av.value - bv.value;
      else result = String(av.value).localeCompare(String(bv.value), undefined, { numeric: true, sensitivity: 'base' });
      return direction === 'desc' ? -result : result;
    });
    return { ...base, rows };
  };
  const metricTable = (metric) => {
    if (metric.tableDataOverride) return metric.tableDataOverride;
    const n = metric.name.toLowerCase();
    if (metric.platform === 'Google Analytics' && metric.name === 'Traffic Acquisition') return { headers: ['Channel', 'Sessions', 'Views', 'User Engagement', 'Active Users', 'New Users'], rows: [['Paid Search','4,820','7,932','2m 14s','3,247','2,188'],['Display','1,846','3,208','1m 42s','1,764','1,018'],['Referral','1,271','1,188','2m 07s','995','694'],['Organic Search','6,325','12,030','3m 06s','5,883','3,880'],['Direct','2,920','4,820','2m 31s','2,100','1,760'],['Email','620','1,420','1m 12s','490','320'],['Affiliates','820','840','0m 48s','680','480'],['Video','2,220','2,600','2m 20s','1,920','1,360'],['Cross-network','340','460','0m 50s','310','220'],['Unassigned','120','210','0m 32s','90','60']] };
    if (metric.platform === 'Google Analytics' && metric.name === 'Top Landing Pages') return { headers: ['Page path and screen class', 'Views', 'Users', 'Avg. engagement time'], rows: [['/','71','21','2m 52s'],['/pages/heritage-villas-ubud','34','20','1m 22s'],['/pages/skylight-villas-ubud','18','20','1m 24s'],['/pages/buki-spa','10','18','0m 47s'],['/pages/jingga-restaurant','7','24','1m 31s'],['/pages/lokal-kafe','25','30','4m 18s'],['/offers','11','22','1m 08s'],['/gallery','48','80','2m 06s'],['/experiences','38','42','2m 40s'],['/about-us','30','33','1m 12s']] };
    // Facebook Page Visits is a Page-level insight, not website landing-page traffic.
    // Its table therefore uses a date/time series for the selected Page metric.
    if (metric.platform === 'Facebook Pages (Organic)' && metric.name === 'Page Visits') return {
      headers: ['Date', 'Page Visits'],
      rows: [['5 Nov 2026', '8,420'], ['4 Nov 2026', '8,106'], ['3 Nov 2026', '7,984'], ['2 Nov 2026', '8,231'], ['1 Nov 2026', '7,862']]
    };
    if (metric.platform === 'Facebook Pages (Organic)' && metric.name === 'Page Views') return {
      headers: ['Date', 'Page Views'],
      rows: [['5 Nov 2026', '21,497'], ['4 Nov 2026', '20,864'], ['3 Nov 2026', '19,932'], ['2 Nov 2026', '20,418'], ['1 Nov 2026', '19,706']]
    };
    // Google Ads sitelinks are individual assets, not campaigns. Keep the
    // table dimension and metrics specific to the sitelink asset itself.
    if (metric.platform === 'Google Ads' && metric.name === 'Landing Page') return { headers: ['Landing Page', 'Clicks', 'Impressions', 'CTR', 'Cost'], rows: [['/','1,820','84,210','2.16%','Rp7,284,000'],['/heritage-villas','1,420','62,840','2.26%','Rp5,680,000'],['/skylight-villas','1,180','54,620','2.16%','Rp4,720,000'],['/offers','842','38,420','2.19%','Rp3,368,000']] };
    if (metric.platform === 'Google Ads' && metric.name === 'Keyword Performance') return { headers: ['Keyword', 'Clicks', 'Impressions', 'CTR'], rows: [['ubud villa','1,248','18,420','6.78%'],['private villa ubud','842','12,640','6.66%'],['bali jungle villa','624','9,820','6.35%'],['luxury villa ubud','518','8,240','6.29%']] };
    if (metric.platform === 'Google Ads' && metric.name === 'Sitelink Performance') return {
      headers: ['Sitelink', 'Clicks', 'Impressions', 'CTR', 'Cost'],
      rows: [['Heritage Villas', '3,120', '152,440', '2.05%', 'IDR 12,480,800'], ['Skylight Villas', '2,680', '130,221', '2.06%', 'IDR 10,764,200'], ['Special Offers', '1,940', '98,560', '1.97%', 'IDR 7,428,600'], ['Jingga Restaurant', '1,520', '76,430', '1.99%', 'IDR 6,452,800'], ['BuKi Spa', '1,310', '64,702', '2.02%', 'IDR 5,673,400']]
    };
    if (metric.platform === 'Facebook Pages (Organic)' && metric.name === 'Post Performance') return {
      headers: ['Post', 'Views', 'Viewers', 'Likes', 'Comments', 'Shares'],
      rows: [['Post 1 · Product feature', '12,480', '9,860', '842', '64', '28'], ['Post 2 · Community story', '9,320', '8,420', '624', '42', '19'], ['Post 3 · Event highlight', '7,840', '7,120', '518', '38', '15'], ['Post 4 · Brand update', '5,210', '4,680', '386', '24', '11']]
    };
    if (metric.platform === 'Instagram Professional' && metric.name === 'Post Performance') return {
      headers: ['Post', 'Reach', 'Impressions', 'Likes', 'Comments', 'Shares'],
      rows: [['Post 1 · Villa feature', '9,869', '12,450', '842', '64', '28'], ['Post 2 · Guest experience', '8,421', '10,230', '624', '42', '19'], ['Post 3 · Dining feature', '7,247', '9,180', '518', '38', '15'], ['Post 4 · Nature detail', '6,180', '7,640', '386', '24', '11']]
    };
    if (n.includes('video')) return { headers: ['Video', 'Views', 'Reach', 'Likes', 'Comments'], rows: [['Video 1','12,480','8,420','842','64'],['Video 2','9,320','6,810','624','42'],['Video 3','7,840','5,620','518','38'],['Video 4','5,210','3,940','386','24']] };
    if (n.includes('campaign') || metric.platform.includes('Ads')) return { headers: ['Campaign', 'Reach', 'Impressions', 'Clicks', 'Cost'], rows: [['Brand Awareness','188,450','251,729','4,820','Rp158,420'],['Sales Campaign','146,210','216,687','3,640','Rp124,760'],['Retargeting','98,340','169,760','2,810','Rp87,060'],['Profile Visit','72,180','134,723','1,940','Rp64,940']] };
    if (n.includes('landing') || n.includes('page')) return { headers: ['Page', 'Views', 'Users', 'Engagement'], rows: [['/','7,120','4,820','2m 52s'],['/heritage-villas','3,420','2,120','1m 22s'],['/skylight-villas','2,810','1,940','1m 24s'],['/experiences','1,840','1,320','2m 06s']] };
    if (n.includes('country') || n.includes('location') || n.includes('city')) return { headers: ['Country', 'Results', 'Reach', 'Impressions'], rows: [['Indonesia','2,486','188,450','412,730'],['Australia','742','46,210','110,348'],['United States','428','32,640','85,200'],['Singapore','312','24,310','56,870']] };
    if (n.includes('keyword')) return { headers: ['Keyword', 'Clicks', 'Impressions', 'CTR'], rows: [['ubud villa','1,248','18,420','6.78%'],['private villa ubud','842','12,640','6.66%'],['bali jungle villa','624','9,820','6.35%']] };
    return { headers: ['Name', 'Current', 'Previous', 'Change'], rows: [['Organic Search','9,869','8,421','+17.2%'],['Direct','4,253','3,726','+14.1%'],['Paid Search','3,247','2,910','+11.6%'],['Referral','2,188','1,947','+12.4%']] };
  };
  const defaultMetricSizes = { 'Number': [1, 1], 'Line Chart': [2, 2], 'Bar Chart': [2, 2], 'Pie Chart': [2, 2], 'Number and Chart': [2, 2], 'Table': [4, 2], 'Maps': [4, 2], 'Map': [4, 2] };
  // Each metric takes its own default visualisation from its ordered compatible
  // type list. Its initial canvas size is then derived from that default type.
  // Table and map cards always start at the full four-column, two-row size.
  const getDefaultMetricConfig = (platform, name, allowedTypes = []) => {
    const preferredDefaults = {
      'Meta Ads|Reach by Country': 'Bar Chart',
    };
    const explicitPreferred = preferredDefaults[`${platform}|${name}`];
    // Performance cards are multi-metric scorecards (views, reach,
    // impressions, cost, conversions), so prefer a Table.
    // Breakdown metrics named "X by Y" prefer a Bar Chart.
    // Both rules respect each metric's approved compatibility list.
    const isPerformanceMetric = /performance/i.test(name);
    const isBreakdownMetric = /\sby\s/i.test(name);
    const preferred = explicitPreferred
      || (isPerformanceMetric && allowedTypes.includes('Table') ? 'Table' : null)
      || (isBreakdownMetric && allowedTypes.includes('Bar Chart') ? 'Bar Chart' : null);
    const type = preferred && allowedTypes.includes(preferred) ? preferred : (allowedTypes[0] || 'Number');
    const size = defaultMetricSizes[type] || defaultMetricSizes[type === 'Map' ? 'Maps' : 'Number'];
    return { type, w: size[0], h: size[1] };
  };
  const makeMetricId = () => `metric-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const metricValueFor = (metricName) => {
    const values = {
      'Page Reach': '24.8K', 'Reach': '24.8K', 'Page Visits': '8,420', 'Profile Visits': '8,420',
      'Sessions': '17,032', 'Total Users': '15,207', 'Impressions': '124.6K', 'Clicks': '8,432', 'Bounce Rate': '2.17%', 'Avg Session Duration': '00:00:39', 'Page Views': '21,497', 'Profile Views': '8,420', 'Link Clicks': '1,284', 'Searches': '12,840', 'Page Visits': '8,420', 'Accounts Engaged': '6,240',
      'Page Views': '21,497', 'Followers': '12,840', 'Conversions': '684', 'Website Clicks': '1,284',
      'Engagement Rate': '6.42%', 'CTR': '3.84%', 'ROAS': '4.8x', 'Amount Spent': 'IDR 4.8M',
      'Organic Traffic': '32.4K', 'Backlinks': '8,216', 'Calls': '248', 'Direction Requests': '516'
    };
    return values[metricName] || (Math.floor(1200 + metricName.length * 431).toLocaleString('en-US'));
  };
  const addDashboardMetric = (platform, name, col = 0, row = 0, targetPageId = null) => {
    const currentPage = targetPageId
      ? reportPagesRef.current.find((p) => p.id === targetPageId)
      : reportPagesRef.current.find((p) => p.active) || reportPagesRef.current.find((p) => p.id === 'p3');
    const pageId = currentPage?.id || 'p3';
    const id = makeMetricId();
    // Treat a newly added metric as an insertion, not as a search for any
    // nearby empty cell. Its initial size comes from its own default type.
    setDashboardMetrics((current) => {
      const allowedTypes = getMetricTypeOptions(platform, name);
      const { type: initialType, w, h } = getDefaultMetricConfig(platform, name, allowedTypes);
      const targetCol = Math.max(0, Math.min(4 - w, col));
      const targetRow = Math.max(0, row);
      const newMetric = {
        id, platform, name, type: initialType, allowedTypes,
        col: targetCol, row: targetRow, w, h, pageId
      };
      return placeMetricWithFlow([...current, newMetric], id, pageId, targetCol, targetRow);
    });
  };
  const getGridDropPosition = (grid, clientX, clientY, w = 1, h = 1) => {
    const rect = grid.getBoundingClientRect();
    const style = window.getComputedStyle(grid);
    const gap = parseFloat(style.columnGap) || 12;
    const paddingLeft = parseFloat(style.paddingLeft) || 4;
    const paddingTop = parseFloat(style.paddingTop) || 4;
    const cellW = (rect.width - paddingLeft - (parseFloat(style.paddingRight) || 4) - gap * 3) / 4;
    const cellH = metricCellHeight;
    const col = Math.max(0, Math.min(4 - w, Math.floor((clientX - rect.left - paddingLeft) / (cellW + gap))));
    const row = Math.max(0, Math.floor((clientY - rect.top - paddingTop) / (cellH + gap)));
    return { col, row, left: paddingLeft + col * (cellW + gap), top: paddingTop + row * (cellH + gap), width: w * cellW + (w - 1) * gap, height: h * cellH + (h - 1) * gap };
  };
  const placeMetricWithFlow = (metrics, metricId, targetPageId, targetCol, targetRow) => {
    const moving = metrics.find((m) => m.id === metricId);
    if (!moving) return metrics;
    const otherPages = metrics.filter((m) => m.pageId !== targetPageId && m.id !== metricId);
    const pageItems = metrics.filter((m) => m.pageId === targetPageId && m.id !== metricId).map((m) => ({ ...m }));
    const w = Math.max(1, Math.min(4, moving.w || 1));
    const h = Math.max(1, moving.h || 1);
    const col = Math.max(0, Math.min(4 - w, targetCol));
    const row = Math.max(0, targetRow);
    const seed = { ...moving, pageId: targetPageId, col, row, w, h };
    const ordered = pageItems.sort((a, b) => a.row - b.row || a.col - b.col);
    // Determine insertion order from the pointer target. Repack the page in
    // reading order so a moved card cannot leave a hole behind or jump past a
    // wide/tall card. Each card keeps its own width and height.
    // Prefer insertion before the card under the pointer (or the first card
    // after the target slot). This prevents a tall/wide card from being skipped
    // when the pointer crosses into its lower rows.
    const hitIndex = ordered.findIndex((card) =>
      col < card.col + card.w && col + w > card.col && row < card.row + card.h && row + h > card.row
    );
    const targetSlot = row * 4 + col;
    let insertAt = hitIndex >= 0 ? hitIndex : ordered.findIndex((card) => (card.row * 4 + card.col) >= targetSlot);
    if (insertAt < 0) insertAt = ordered.length;
    const sequence = [...ordered];
    sequence.splice(insertAt, 0, seed);
    const placed = [];
    const overlaps = (a, b) => a.col < b.col + b.w && a.col + a.w > b.col && a.row < b.row + b.h && a.row + a.h > b.row;
    let cursor = 0;
    for (const card of sequence) {
      let found = false;
      for (let tries = 0; tries < 10000 && !found; tries++) {
        let r = Math.floor(cursor / 4);
        let c = cursor % 4;
        if (c + card.w > 4) { cursor = (r + 1) * 4; continue; }
        const candidate = { ...card, pageId: targetPageId, col: c, row: r };
        if (!placed.some((p) => overlaps(candidate, p))) {
          placed.push(candidate);
          cursor = r * 4 + c + card.w;
          found = true;
        } else cursor++;
      }
      if (!found) {
        const lastRow = placed.reduce((max, item) => Math.max(max, item.row + item.h), 0);
        placed.push({ ...card, pageId: targetPageId, col: 0, row: lastRow });
        cursor = lastRow * 4 + card.w;
      }
    }
    return [...otherPages, ...placed];
  };
  // Existing-card drag uses a spatial insertion strategy: keep unaffected cards
  // in their current grid slots, place the dragged card at the exact target slot,
  // and push only cards that collide with it (or with a card pushed below it).
  // This avoids reading-order repacking that made a half-width chart jump past
  // a full-width table when the pointer crossed the table's tall bounding box.
  const placeDraggedMetricInGrid = (metrics, metricId, targetPageId, targetCol, targetRow) => {
    const moving = metrics.find((m) => m.id === metricId);
    if (!moving) return metrics;
    const otherPages = metrics.filter((m) => m.pageId !== targetPageId && m.id !== metricId);
    const pageItems = metrics
      .filter((m) => m.pageId === targetPageId && m.id !== metricId)
      .map((m) => ({ ...m }))
      .sort((a, b) => a.row - b.row || a.col - b.col);
    const w = Math.max(1, Math.min(4, moving.w || 1));
    const h = Math.max(1, moving.h || 1);
    const seed = {
      ...moving,
      pageId: targetPageId,
      col: Math.max(0, Math.min(4 - w, targetCol)),
      row: Math.max(0, targetRow),
      w,
      h,
    };
    const overlaps = (a, b) =>
      a.col < b.col + b.w && a.col + a.w > b.col &&
      a.row < b.row + b.h && a.row + a.h > b.row;
    const placed = [seed];
    for (const card of pageItems) {
      let candidate = { ...card };
      // Preserve its original grid location whenever possible. If the moved
      // card or an earlier displaced card occupies that slot, shift downward
      // by whole grid rows until it fits. Never move a card above its old row.
      while (placed.some((p) => overlaps(candidate, p))) {
        candidate.row += 1;
      }
      placed.push(candidate);
    }
    return [...otherPages, ...placed];
  };

  const getPreviewLayoutForPage = (pageId) => {
    if (!metricDragPreview || metricDragPreview.pageId !== pageId) return null;
    const base = dashboardMetrics.filter((m) => m.pageId === pageId);
    let movingId = metricDragPreview.id;
    let working = dashboardMetrics;
    if (!movingId || !base.some((m) => m.id === movingId)) {
      movingId = '__getone_drag_preview__';
      working = [...dashboardMetrics, {
        id: movingId,
        pageId,
        platform: metricDragPreview.platform || selectedMetricPlatform || 'Metric',
        name: metricDragPreview.name || 'New metric',
        type: 'Number and Chart',
        col: metricDragPreview.col,
        row: metricDragPreview.row,
        w: metricDragPreview.w || 1,
        h: metricDragPreview.h || 1,
      }];
    }
    const flowed = base.some((m) => m.id === movingId)
      ? placeDraggedMetricInGrid(working, movingId, pageId, metricDragPreview.col, metricDragPreview.row)
      : placeMetricWithFlow(working, movingId, pageId, metricDragPreview.col, metricDragPreview.row);
    return new Map(flowed.filter((m) => m.pageId === pageId && m.id !== movingId).map((m) => [m.id, m]));
  };
  const findFreeMetricPosition = (metrics, col, row, w, h, ignoreId, pageIdOverride) => {
    const targetPageId = pageIdOverride ?? metrics.find((x) => x.id === ignoreId)?.pageId;
    const overlaps = (c, r) => metrics.some((m) => m.pageId === targetPageId && m.id !== ignoreId && c < m.col + m.w && c + w > m.col && r < m.row + m.h && r + h > m.row);
    let c0 = Math.max(0, Math.min(4 - w, col));
    let r0 = Math.max(0, row);
    if (!overlaps(c0, r0)) return { col: c0, row: r0 };
    for (let radius = 1; radius < 100; radius++) {
      for (let r = Math.max(0, r0 - radius); r <= r0 + radius; r++) {
        for (let c = 0; c <= 4 - w; c++) if (!overlaps(c, r)) return { col: c, row: r };
      }
    }
    return { col: c0, row: r0 + 1 };
  };
  const startMetricPointerInteraction = (e, metric, mode) => {
    if (e.button !== undefined && e.button !== 0) return;
    // Do not prevent the pointer's default action here: doing so can suppress
    // the subsequent click event used to open the metric options menu.
    e.stopPropagation();
    const originGrid = reportPaperRefs.current[metric.pageId]?.querySelector('[data-metric-grid]');
    if (!originGrid) return;
    const originRect = originGrid.getBoundingClientRect();
    const originStyle = window.getComputedStyle(originGrid);
    const gap = parseFloat(originStyle.columnGap) || 12;
    const padL = parseFloat(originStyle.paddingLeft) || 4;
    const cellW = (originRect.width - padL - (parseFloat(originStyle.paddingRight) || 4) - gap * 3) / 4;
    const rowHeight = metricCellHeight;
    metricInteractionRef.current = { id: metric.id, mode, startX: e.clientX, startY: e.clientY, startCol: metric.col, startRow: metric.row, startW: metric.w, startH: metric.h, colWidth: cellW, rowHeight, originPageId: metric.pageId, targetPageId: metric.pageId, targetCol: metric.col, targetRow: metric.row, moved: false };
    const onMove = (ev) => {
      const it = metricInteractionRef.current; if (!it) return;
      const dx = ev.clientX - it.startX, dy = ev.clientY - it.startY;
      if (Math.abs(dx) + Math.abs(dy) > 3) { it.moved = true; metricSuppressClickRef.current = true; }
      let targetGrid = null, targetPageId = null;
      for (const page of reportPagesRef.current) {
        const grid = reportPaperRefs.current[page.id]?.querySelector('[data-metric-grid]');
        if (!grid) continue;
        const rect = grid.getBoundingClientRect();
        if (ev.clientX >= rect.left && ev.clientX <= rect.right && ev.clientY >= rect.top - 20 && ev.clientY <= rect.bottom + 24) { targetGrid = grid; targetPageId = page.id; break; }
      }
      if (it.mode === 'drag' && targetGrid && targetPageId) {
        const pos = getGridDropPosition(targetGrid, ev.clientX, ev.clientY, it.startW, it.startH);
        it.targetPageId = targetPageId; it.targetCol = pos.col; it.targetRow = pos.row;
        const previous = metricDragPreview;
        if (!previous || previous.pageId !== targetPageId || previous.col !== pos.col || previous.row !== pos.row) captureMetricRects();
        setMetricDragPreview({ id: it.id, pageId: targetPageId, col: pos.col, row: pos.row, w: it.startW, h: it.startH });
      } else if (it.mode === 'drag') {
        setMetricDragPreview(null);
      } else {
        const nextW = Math.max(1, Math.min(4 - it.startCol, it.startW + Math.round(dx / (it.colWidth + 12))));
        const nextH = Math.max(1, it.startH + Math.round(dy / (it.rowHeight + 12)));
        if (nextW !== it.lastW || nextH !== it.lastH) {
          if (it.lastW === undefined) { it.lastW = it.startW; it.lastH = it.startH; }
          if (nextW !== it.lastW || nextH !== it.lastH) captureMetricRects();
          it.lastW = nextW; it.lastH = nextH;
          setDashboardMetrics((curr) => reflowAfterMetricChange(curr.map((m) => m.id === it.id ? { ...m, w: nextW, h: nextH } : m), it.id));
        }
      }
    };
    const onUp = () => {
      const it = metricInteractionRef.current;
      if (it?.mode === 'drag' && it.moved && it.targetPageId) {
        captureMetricRects();
        setDashboardMetrics((curr) => placeDraggedMetricInGrid(curr, it.id, it.targetPageId, it.targetCol, it.targetRow));
        setReportPages((prev) => prev.map((p) => ({ ...p, active: p.id === it.targetPageId })));
      }
      setMetricDragPreview(null);
      window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); window.removeEventListener('pointercancel', onUp);
      metricInteractionRef.current = null;
    };
    window.addEventListener('pointermove', onMove); window.addEventListener('pointerup', onUp); window.addEventListener('pointercancel', onUp);
  };
  // Reflow cards after a size/type change. Keep the edited card anchored, then
  // let the following cards flow left-to-right and wrap to the next row, Word-style.
  const reflowAfterMetricChange = (metrics, metricId) => {
    const changed = metrics.find((m) => m.id === metricId);
    if (!changed) return metrics;
    const pageItems = metrics.filter((m) => m.pageId === changed.pageId).map((m) => ({ ...m }));
    const otherPages = metrics.filter((m) => m.pageId !== changed.pageId);
    const anchor = pageItems.find((m) => m.id === metricId);
    const ordered = pageItems.filter((m) => m.id !== metricId).sort((a, b) => a.row - b.row || a.col - b.col);
    const overlaps = (a, b) => a.col < b.col + b.w && a.col + a.w > b.col && a.row < b.row + b.h && a.row + a.h > b.row;
    const before = ordered.filter((m) => m.row < anchor.row || (m.row === anchor.row && m.col < anchor.col));
    const after = ordered.filter((m) => !before.some((x) => x.id === m.id));
    const placed = [];
    const fits = (card, col, row) => col >= 0 && col + card.w <= 4 && !overlaps({ ...card, col, row }, anchor) && !placed.some((x) => overlaps({ ...card, col, row }, x));
    // Preserve cards before the edited card wherever possible.
    before.forEach((card) => {
      if (!overlaps(card, anchor) && !placed.some((x) => overlaps(card, x))) placed.push(card);
      else after.push(card);
    });
    // Place cards after the anchor in reading order, starting immediately after it.
    let cursor = anchor.row * 4 + anchor.col + anchor.w;
    for (const card of after) {
      let found = false;
      for (let tries = 0; tries < 2000 && !found; tries++) {
        const row = Math.floor(cursor / 4);
        let col = cursor % 4;
        if (col + card.w > 4) { cursor = (row + 1) * 4; continue; }
        if (fits(card, col, row)) {
          placed.push({ ...card, col, row });
          cursor = row * 4 + col + card.w;
          found = true;
        } else cursor++;
      }
      if (!found) placed.push({ ...card, col: 0, row: Math.max(anchor.row + anchor.h, ...placed.map((x) => x.row + x.h), 0) });
    }
    return [...otherPages, ...placed, anchor];
  };
  const changeMetricType = (id, type) => {
    const targetMetric = dashboardMetrics.find((m) => m.id === id);
    const compatible = targetMetric?.allowedTypes || getMetricTypeOptions(targetMetric?.platform, targetMetric?.name);
    if (compatible.length && !compatible.includes(type)) return;
    captureMetricRects();
    const [w, h] = defaultMetricSizes[type] || defaultMetricSizes[type === 'Map' ? 'Maps' : 'Number'];
    setDashboardMetrics((curr) => {
      const updated = curr.map((m) => m.id === id ? { ...m, type, w: Math.min(w, 4 - m.col), h } : m);
      return reflowAfterMetricChange(updated, id);
    });
    setOpenMetricMenuId(null);
  };
  const [dataSources, setDataSources] = useState([
    { id: 'ds1', property: 'Prasana Villas Uluwatu', name: 'Instagram', svg: <svg className="w-4 h-4 fill-pink-600" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>, label: 'Prasana Instagram Account', connectedBy: 'Arysta Hendrik', status: 'Connected' },
    { id: 'ds2', property: 'Prasana Villas Uluwatu', name: 'Facebook', svg: <svg className="w-4 h-4 fill-blue-600" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>, label: 'Prasana Facebook Page', connectedBy: 'Arysta Hendrik', status: 'Connected' },
    { id: 'ds3', property: 'Prasana Villas Uluwatu', name: 'Google Ads', svg: <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#FBBC05" d="M5.4 14.5l6.5-11.3c.6-1 1.9-1.3 2.9-.7 1 .6 1.3 1.9.7 2.9L9 16.7c-.6 1-1.9 1.3-2.9.7-1-.6-1.3-1.9-.7-2.9z"/><path fill="#4285F4" d="M12.5 17.5c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4z"/><path fill="#34A853" d="M2.5 13.5c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z"/></svg>, label: 'Google Ads Account', connectedBy: 'Arysta Hendrik', status: 'Connected' },
    { id: 'ds4', property: 'Prasana Villas Uluwatu', name: 'Meta Ads', svg: <svg className="w-4 h-4 fill-blue-500" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.328 13.5c-1.127 0-2.128-.535-2.778-1.365-.65.83-1.651 1.365-2.778 1.365-2.015 0-3.65-1.635-3.65-3.65s1.635-3.65 3.65-3.65c1.127 0 2.128.535 2.778 1.365.65-.83 1.651-1.365 2.778-1.365 2.015 0 3.65 1.635 3.65 3.65s-1.635 3.65-3.65 3.65z"/></svg>, label: 'Meta Ads Account', connectedBy: 'Arysta Hendrik', status: 'Connected' },
    { id: 'ds5', property: 'Prasana Villas Uluwatu', name: 'Google Analytics', svg: <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#F9AB00" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>, label: 'Prasana Analytics', connectedBy: 'Arysta Hendrik', status: 'Connected' },
    { id: 'ds6', property: 'Prasana Villas Uluwatu', name: 'Google Business Profile', svg: <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>, label: 'Prasana Business Profile', connectedBy: 'Arysta Hendrik', status: 'Connected' },
    { id: 'ds7', property: 'Prasana Villas Uluwatu', name: 'YouTube Analytics', svg: <svg className="w-4 h-4 fill-pink-600" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>, label: 'Prasana YouTube Channel', connectedBy: 'Arysta Hendrik', status: 'Connected' },
    { id: 'ds8', property: 'Prasana Villas Uluwatu', name: 'TikTok Organic', svg: <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#F9AB00" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>, label: 'Prasana TikTok Account', connectedBy: 'Arysta Hendrik', status: 'Connected' },
    { id: 'ds9', property: 'Prasana Villas Uluwatu', name: 'TikTok Ads', svg: <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>, label: 'Prasana TikTok Ads Account', connectedBy: 'Arysta Hendrik', status: 'Connected' },
  ]);



  // Data source rows are scoped to the selected property. Prasana uses the supplied
  // reference records; other properties receive independent prototype/demo records.
  const propertyDataSources = selectedClient === 'Prasana Villas Uluwatu'
    ? dataSources.filter((source) => source.property === selectedClient)
    : dataSources.map((source, index) => ({
        ...source,
        id: `${selectedClient}-${source.id}`,
        property: selectedClient,
        label: ({
          'Instagram': `${selectedClient} Instagram`,
          'Facebook': `${selectedClient} Facebook Page`,
          'Google Ads': `${selectedClient} Google Ads Account`,
          'Meta Ads': `${selectedClient} Meta Ads Account`,
          'Google Analytics': `${selectedClient} Website Analytics`,
          'Google Business Profile': `${selectedClient} Business Profile`,
          'YouTube Analytics': `${selectedClient} YouTube Channel`,
          'TikTok Organic': `${selectedClient} TikTok Account`,
          'TikTok Ads': `${selectedClient} TikTok Ads Account`,
        }[source.name] || selectedClient),
        connectedBy: index % 2 === 0 ? 'Arysta Hendrik' : 'Property Admin',
        status: (selectedClient === 'Bumi Kinar Ubud'
          ? ['Connected', 'Connected', 'Connected', 'Disconnected', 'Never connected', 'Connected', 'Never connected', 'Disconnected', 'Connected']
          : selectedClient === 'Patra Bali'
            ? ['Connected', 'Connected', 'Connected', 'Connected', 'Connected', 'Connected', 'Connected', 'Connected', 'Connected']
            : ['Connected', 'Disconnected', 'Connected', 'Disconnected', 'Disconnected', 'Connected', 'Never connected', 'Never connected', 'Never connected'])[index],
      })).filter((source) => source.status !== 'Never connected');

  const platformIntegrationName = (platformName) => ({
    'Facebook Pages (Organic)': 'Facebook',
    'Facebook Pages': 'Facebook',
    'Instagram Professional': 'Instagram',
  }[platformName] || platformName);
  const propertyDataSourcesWithIcons = propertyDataSources.map((source) => ({
    ...source,
    svg: integrationsList.find((platform) => platformIntegrationName(platform.name) === source.name)?.svg || source.svg,
  }));
  const propertyIntegrations = integrationsList.map((item) => {
    const integrationName = platformIntegrationName(item.name);
    const matchingSources = propertyDataSourcesWithIcons.filter((source) => source.name === integrationName);
    const connected = matchingSources.some((source) => source.status === 'Connected');
    return { ...item, connected, integrationAvailable: matchingSources.length > 0 };
  });
  const orderedPropertyIntegrations = [
    ...propertyIntegrations.filter((item) => item.connected),
    ...propertyIntegrations.filter((item) => !item.connected),
  ];
  // Data Sources is the single source of truth for page visibility and platform availability.
  // A disconnected integration remains listed (and keeps its page); a never-connected
  // platform has no Data Source record and therefore no page in the navigation/canvas.
  const pageIntegrationName = (pageTitle) => ({
    'Google Analytics': 'Google Analytics',
    'Google Ads': 'Google Ads',
    'Google Business Profile': 'Google Business Profile',
    'YouTube Analytics': 'YouTube Analytics',
    'Meta Ads': 'Meta Ads',
    'Facebook Pages': 'Facebook',
    'Instagram Professional': 'Instagram',
    'TikTok Organic': 'TikTok Organic',
    'TikTok Ads': 'TikTok Ads',
  }[pageTitle] || pageTitle);
  const visibleReportPages = reportPages.filter((page) => {
    if (page.title === 'Cover Page' || page.isCover || page.isCustom) return true;
    const sourceName = pageIntegrationName(page.sourceTitle || page.title.replace(/ \(Copy(?: \d+)?\)$/i, ''));
    return propertyDataSources.some((source) => source.name === sourceName);
  });
  const getPageIntegrationStatus = (pageTitle) => {
    const sourceName = pageIntegrationName(pageTitle);
    const matchingSource = propertyDataSources.find((source) => source.name === sourceName);
    return matchingSource?.status || null;
  };

  const [viewingSavedReport, setViewingSavedReport] = useState(null);
  const dashboardBackupRef = useRef(null);
  const [pendingPrintReportId, setPendingPrintReportId] = useState(null);
  const pendingReportWindowRef = useRef(null);
  const [pendingNewTabReportId, setPendingNewTabReportId] = useState(null);
  const [saveTargetReportId, setSaveTargetReportId] = useState('');

  const captureDashboardSnapshot = () => ({
    dashboardMetrics: dashboardMetrics.map((metric) => ({ ...metric })),
    reportPages: reportPages.map((page) => ({ ...page })),
    selectedClient,
    dateRange,
    startDate,
    endDate,
    datePreset,
    isCompareEnabled,
    compareMode,
    compareStartDate,
    compareEndDate,
  });

  const restoreDashboardSnapshot = (snapshot) => {
    if (!snapshot) return;
    setDashboardMetrics((snapshot.dashboardMetrics || []).map((metric) => ({ ...metric })));
    setReportPages((snapshot.reportPages || []).map((page) => ({ ...page })));
    setSelectedClient(snapshot.selectedClient || 'Prasana Villas Uluwatu');
    setDateRange(snapshot.dateRange || 'Reporting Period');
    setStartDate(snapshot.startDate || '');
    setEndDate(snapshot.endDate || '');
    setDatePreset(snapshot.datePreset || 'Custom');
    setIsCompareEnabled(!!snapshot.isCompareEnabled);
    setCompareMode(snapshot.compareMode || 'Last Month');
    setCompareStartDate(snapshot.compareStartDate || '');
    setCompareEndDate(snapshot.compareEndDate || '');
  };

  const openSavedReport = (report, shouldPrint = false) => {
    if (!report?.snapshot) {
      window.alert('This demo report does not contain a saved dashboard snapshot yet. Save a new report from the dashboard to use View and PDF export.');
      return;
    }
    // Always open the saved snapshot in a separate tab. Open synchronously
    // during the click so browser popup blockers allow it.
    const reportWindow = window.open('', '_blank');
    if (!reportWindow) {
      window.alert('Please allow pop-ups for GOA to open the saved report in a new tab.');
      return;
    }
    pendingReportWindowRef.current = reportWindow;
    pendingPrintInNewTabRef.current = !!shouldPrint;
    dashboardBackupRef.current = captureDashboardSnapshot();
    restoreDashboardSnapshot(report.snapshot);
    setViewingSavedReport(report);
    setSelectedMetricPlatform(null);
    setActiveTab('dashboard');
    setActiveMenuReportId(null);
    setIsDatePickerOpen(false);
    setPendingPrintReportId(null);
    setPendingNewTabReportId(report.id);
  };

  const closeSavedReport = () => {
    if (dashboardBackupRef.current) restoreDashboardSnapshot(dashboardBackupRef.current);
    dashboardBackupRef.current = null;
    setViewingSavedReport(null);
    setPendingPrintReportId(null);
    setActiveTab('reports');
  };

  useEffect(() => {
    if (!viewingSavedReport || !pendingNewTabReportId || !pendingReportWindowRef.current) return;
    const reportWindow = pendingReportWindowRef.current;
    const root = reportScrollRef.current;
    if (!root) return;
    try {
      const safeTitle = String(viewingSavedReport.name || 'Saved Report').replace(/[<>&"']/g, '');
      reportWindow.document.open();
      reportWindow.document.write('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>' + safeTitle + '</title></head><body style="margin:0;background:#f1f5f9;font-family:Arial,sans-serif;"></body></html>');
      Array.from(document.querySelectorAll('link[rel="stylesheet"], style')).forEach((node) => {
        reportWindow.document.head.appendChild(node.cloneNode(true));
      });

      const toolbar = reportWindow.document.createElement('div');
      toolbar.style.cssText = 'position:sticky;top:0;z-index:9999;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 20px;background:#fff;border-bottom:1px solid #e2e8f0;box-shadow:0 1px 4px rgba(15,23,42,.06);font:13px Arial,sans-serif;';
      const title = reportWindow.document.createElement('div');
      title.textContent = safeTitle;
      title.style.cssText = 'font-weight:700;color:#0f172a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;';
      const actions = reportWindow.document.createElement('div');
      actions.style.cssText = 'display:flex;align-items:center;gap:8px;flex-shrink:0;';
      const saveButton = reportWindow.document.createElement('button');
      saveButton.type = 'button';
      saveButton.textContent = 'Save PDF';
      saveButton.style.cssText = 'border:1px solid #cbd5e1;border-radius:8px;background:#fff;color:#334155;padding:9px 13px;font-weight:700;cursor:default;';
      saveButton.addEventListener('click', () => reportWindow.print());
      const closeButton = reportWindow.document.createElement('button');
      closeButton.type = 'button';
      closeButton.textContent = 'Close Tab';
      closeButton.style.cssText = 'border:0;border-radius:8px;background:#2563eb;color:#fff;padding:9px 13px;font-weight:700;cursor:default;';
      closeButton.addEventListener('click', () => reportWindow.close());
      actions.appendChild(saveButton);
      actions.appendChild(closeButton);
      toolbar.appendChild(title);
      toolbar.appendChild(actions);
      reportWindow.document.body.appendChild(toolbar);

      const frozenWrap = reportWindow.document.createElement('div');
      frozenWrap.style.cssText = 'width:100%;box-sizing:border-box;padding:28px 16px;display:flex;flex-direction:column;align-items:center;gap:20px;';
      const frozenRoot = root.cloneNode(true);
      frozenRoot.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:20px;width:100%;height:auto;min-height:0;max-height:none;overflow:visible;padding:0;margin:0;background:transparent;';
      frozenRoot.querySelectorAll('[data-report-page]').forEach((page) => {
        page.style.width = '1120px';
        page.style.minWidth = '1120px';
        page.style.maxWidth = '1120px';
        page.style.boxSizing = 'border-box';
        page.style.flex = '0 0 auto';
        page.style.overflow = 'visible';
        page.style.pointerEvents = 'none';
        page.querySelectorAll('button').forEach((button) => button.remove());
      });
      frozenWrap.appendChild(frozenRoot);
      reportWindow.document.body.appendChild(frozenWrap);
      const printStyle = reportWindow.document.createElement('style');
      printStyle.textContent = 'html,body{margin:0;min-height:100%;overflow:auto} @media print{@page{size:A4 landscape;margin:10mm}.goa-report-toolbar{display:none!important}body{background:#fff!important}.goa-frozen-page{width:100%!important;max-width:100%!important;box-shadow:none!important;break-after:page;page-break-after:always} [data-report-page]{width:100%!important;min-width:0!important;max-width:100%!important;overflow:visible!important}}';
      toolbar.classList.add('goa-report-toolbar');
      frozenRoot.classList.add('goa-frozen-page');
      reportWindow.document.head.appendChild(printStyle);
      reportWindow.document.title = safeTitle;

      if (pendingPrintInNewTabRef.current) {
        pendingPrintInNewTabRef.current = false;
        reportWindow.setTimeout(() => {
          const images = Array.from(reportWindow.document.images || []);
          Promise.all([
            reportWindow.document.fonts?.ready || Promise.resolve(),
            ...images.map((image) => image.complete ? Promise.resolve() : new Promise((resolve) => {
              image.addEventListener('load', resolve, { once: true });
              image.addEventListener('error', resolve, { once: true });
            }))
          ]).then(() => reportWindow.setTimeout(() => reportWindow.print(), 250));
        }, 700);
      }
    } catch (error) {
      reportWindow.document.body.textContent = 'Unable to render this saved report in a new tab. Please return to GOA and try again.';
    }
    pendingReportWindowRef.current = null;
    setPendingNewTabReportId(null);
    if (dashboardBackupRef.current) restoreDashboardSnapshot(dashboardBackupRef.current);
    dashboardBackupRef.current = null;
    setViewingSavedReport(null);
    setActiveTab('reports');
  }, [viewingSavedReport, pendingNewTabReportId]);

  const pendingPrintInNewTabRef = useRef(false);

  const [reportList, setReportList] = useState(() => {
    const demoProperties = [
      { id: 'demo-prasana', client: 'Prasana Villas Uluwatu', created: 'Aug 13, 2026' },
      { id: 'demo-bumikinar', client: 'Bumi Kinar Ubud', created: 'Nov 10, 2026' },
      { id: 'demo-selongselo', client: 'Selong Selo Resort & Villas', created: 'Nov 10, 2026' },
      { id: 'demo-patra', client: 'Patra Bali', created: 'Nov 10, 2026' },
    ];
    const demoReports = demoProperties.map((property) => ({
      id: property.id,
      name: 'Demo Report',
      client: 'System',
      user: 'System',
      type: 'Demo',
      created: property.created,
      propertyClient: property.client,
      active: true,
      dateRange,
      snapshot: {
        dashboardMetrics: dashboardMetrics.map((metric) => ({ ...metric })),
        reportPages: reportPages.map((page) => ({ ...page })),
        selectedClient: property.client,
        dateRange,
        startDate,
        endDate,
        datePreset,
        isCompareEnabled,
        compareMode,
        compareStartDate,
        compareEndDate,
      },
    }));
    const prasanaCustomReports = [
      { id: 'r2', name: 'Prasana Villas Uluwatu - September 2026', client: 'Prasana Villas Uluwatu', user: 'Arysta Hendrik', type: 'Admin', created: 'Oct 16, 2026' },
      { id: 'r3', name: 'Prasana Villas Uluwatu - October 2026', client: 'Prasana Villas Uluwatu', userId: 'u2', user: 'Hospio Team', type: 'Member', created: 'Oct 20, 2026' },
      { id: 'r4', name: 'Prasana Villas Uluwatu - August 2026', client: 'Prasana Villas Uluwatu', user: 'Arysta Hendrik', type: 'Admin', created: 'Sep 02, 2026' },
      { id: 'r5', name: 'Prasana Villas Uluwatu - September 2025', client: 'Prasana Villas Uluwatu', user: 'Arysta Hendrik', type: 'Admin', created: 'Oct 15, 2025' },
      { id: 'r6', name: 'Prasana Villas Uluwatu - August 2025', client: 'Prasana Villas Uluwatu', userId: 'u2', user: 'Hospio Team', type: 'Member', created: 'Sep 05, 2025' },
    ];
    const sortedPrasanaReports = prasanaCustomReports.sort((a, b) => new Date(b.created) - new Date(a.created));
    return [...sortedPrasanaReports, ...demoReports];
  });

  const handleSaveReport = (e) => {
    e.preventDefault();
    const snapshot = captureDashboardSnapshot();
    const savedName = reportName.trim() || `${selectedClient} ${dateRange}`;
    const created = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    let savedReport;
    if (saveTargetReportId) {
      const target = reportList.find((report) => report.id === saveTargetReportId);
      if (!target) return;
      savedReport = { ...target, name: savedName, client: selectedClient, user: `${profileFirstName} ${profileLastName}`.trim(), type: activePropertyRole, created, dateRange, snapshot };
      setReportList((current) => current.map((report) => report.id === saveTargetReportId ? savedReport : report));
    } else {
      savedReport = { id: 'r_' + Date.now(), name: savedName, client: selectedClient, user: `${profileFirstName} ${profileLastName}`.trim(), type: activePropertyRole, created, dateRange, snapshot };
      setReportList((current) => [savedReport, ...current]);
    }
    setSaveTargetReportId('');
    setIsSavedModalOpen(false);
    setLatestSavedReportName(savedReport.name);
    setIsSuccessModalOpen(true);
  };

  const confirmDeleteReport = () => {
    if (reportToDelete) {
      setReportList(reportList.filter(rep => rep.id !== reportToDelete.id));
      setIsDeleteModalOpen(false);
      setReportToDelete(null);
      setActiveMenuReportId(null);
    }
  };

  const confirmDeletePage = () => {
    if (pageToDelete) {
      if (reportPages.length > 1) {
        setReportPages(reportPages.filter(p => p.id !== pageToDelete.id));
      } else {
        alert('Cannot delete the last remaining page.');
      }
      setIsDeletePageModalOpen(false);
      setPageToDelete(null);
      setActivePageMenuId(null);
    }
  };

  const handleConfirmAddClient = (e) => {
    e.preventDefault();
    if (newClientInputValue && newClientInputValue.trim() !== '') {
      const trimmed = newClientInputValue.trim();
      if (!clientList.includes(trimmed)) {
        setClientList([...clientList, trimmed]);
      }
      setSelectedClient(trimmed);
      setNewClientInputValue('');
      setIsAddClientModalOpen(false);
    }
  };

  const getPageGridHeight = (pageId) => {
    const pageMetrics = dashboardMetrics.filter((metric) => metric.pageId === pageId);
    const bottomRow = pageMetrics.reduce((maxRow, metric) => Math.max(maxRow, metric.row + metric.h), 0);
    const rows = Math.max(1, bottomRow);
    // Keep only a small bottom drop zone; expand naturally when a card is placed below.
    return rows * metricCellHeight + Math.max(0, rows - 1) * 12 + 24;
  };

  const isAccountSection = ['profile', 'users', 'billing', 'settings'].includes(activeTab);

  return (
    <div className={`h-screen w-screen bg-slate-50 text-slate-800 flex font-sans overflow-hidden ${viewingSavedReport ? 'saved-report-mode' : ''}`}>
      <style>{`@media print { @page { size: A4 portrait; margin: 12mm; } .saved-report-mode { height: auto !important; width: 100% !important; overflow: visible !important; display: block !important; position: static !important; } body * { visibility: hidden !important; } #report-print-root, #report-print-root * { visibility: visible !important; } #report-print-root { position: absolute !important; left: 0 !important; top: 0 !important; width: 100% !important; height: auto !important; overflow: visible !important; padding: 0 !important; margin: 0 !important; background: white !important; display: block !important; } #report-print-root [data-report-page] { break-after: page; page-break-after: always; box-shadow: none !important; border: 0 !important; border-radius: 0 !important; margin: 0 0 8mm 0 !important; width: 100% !important; min-height: 250mm; overflow: visible !important; } #report-print-root [data-metric-grid] { overflow: visible !important; } #report-print-root [data-metric-id] { break-inside: avoid; page-break-inside: avoid; } .print\:hidden { display: none !important; } } .saved-report-mode [data-metric-grid] { pointer-events: none !important; } .saved-report-mode [data-metric-id] button { display: none !important; } .goa-user-dashboard-page [data-metric-id] button { display: none !important; } .goa-user-dashboard-page [data-metric-grid] { pointer-events: none !important; } @keyframes goaDropPulse { 0%,100% { box-shadow: 0 4px 14px rgba(37,99,235,.10); background-color: rgba(239,246,255,.78); } 50% { box-shadow: 0 6px 20px rgba(37,99,235,.20); background-color: rgba(219,234,254,.88); } }`}</style>
      
      {/* 1. SIDEBAR KIRI UTAMA */}
      {!viewingSavedReport && <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-4 shrink-0 shadow-sm z-30 h-full">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
              <img src="/favicon-32x32.png" alt="Get One Analytics" className="w-8 h-8 object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 text-sm tracking-tight">Get One Analytics</span>
              <span className="text-xs text-slate-400 font-medium">Performance Dashboard</span>
            </div>
          </div>

          <nav className="flex flex-col gap-1.5 text-sm font-medium">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors cursor-default ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <svg className={`w-4 h-4 ${activeTab === 'dashboard' ? 'fill-blue-600' : 'fill-blue-500'}`} viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3H3z"/></svg> 
              Dashboards
            </button>
            <button 
              onClick={() => setActiveTab('reports')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors cursor-default ${activeTab === 'reports' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <svg className={`w-4 h-4 ${activeTab === 'reports' ? 'fill-blue-600' : 'fill-blue-500'}`} viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg> 
              Reports
            </button>
            <button 
              onClick={() => setActiveTab('datasource')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors cursor-default ${activeTab === 'datasource' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <svg className={`w-4 h-4 ${activeTab === 'datasource' ? 'fill-blue-600' : 'fill-blue-500'}`} viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg> 
              Data Source
            </button>
          </nav>
        </div>

        <div className="border-t border-slate-200 pt-3 relative" ref={accountMenuRef}>
          <div 
            onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
            className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-slate-100 cursor-default select-none"
          >
            <div className="w-9 h-9 bg-slate-900 rounded-full text-white flex items-center justify-center text-xs font-bold shadow-sm overflow-hidden">{profilePhoto ? <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" /> : 'AH'}</div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900 leading-tight">{profileFirstName} {profileLastName}</span>
              <span className="text-xs text-slate-500 font-medium">Account</span>
            </div>
          </div>

          {isAccountMenuOpen && (
            <div className="absolute bottom-16 left-2 w-56 bg-white border border-slate-200 rounded-xl shadow-2xl p-2.5 z-50 flex flex-col text-sm">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <p className="font-bold text-slate-900 text-sm">{profileFirstName} {profileLastName}</p>
                <p className="text-xs text-slate-400">{profileEmail}</p>
              </div>
              {[['profile','Profile'],['users','User'],['billing','Billing'],['settings','Settings']].map(([tab,label]) => <button key={tab} onClick={() => { setActiveTab(tab); setIsAccountMenuOpen(false); }} className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 font-medium">{label}</button>)}
              <div className="border-t border-slate-100 my-1"></div>
              <button onClick={() => { setIsAccountMenuOpen(false); setShowLogoutConfirm(true); }} className="text-left px-3 py-2 rounded-lg hover:bg-rose-50 text-rose-600 font-semibold">Logout</button>
            </div>
          )}
        </div>
      </aside>}

      {/* AREA KANAN UTAMA */}
      <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden text-[13px]">
        
        {/* TOP BAR */}
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shrink-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
            {isAccountSection ? (
              <span className="text-sm font-bold text-slate-800 px-1">{profileFirstName} {profileLastName}</span>
            ) : <>
            {/* CUSTOM CLIENT DROPDOWN */}
            <div className={`relative inline-block ${viewingSavedReport ? 'hidden' : ''}`} ref={clientDropdownRef}>
              <div 
                onClick={() => {
                  setIsClientDropdownOpen((open) => {
                    if (open) setActivePropertyMenu(null);
                    return !open;
                  });
                }}
                className="bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 text-sm font-bold rounded-lg px-3 py-1.5 pr-8 flex items-center justify-between gap-3 cursor-default shadow-sm select-none min-w-[220px]"
              >
                <span className="truncate">{selectedClient}</span>
                <span className="text-slate-400 text-xs absolute right-3 pointer-events-none">▼</span>
              </div>

              {isClientDropdownOpen && (
                <div className="absolute left-0 top-11 w-64 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 flex flex-col text-sm">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Select Property</div>
                  <div className="max-h-48 overflow-y-auto flex flex-col py-1">
                    {accessibleProperties.map((client, idx) => (
                      <div key={idx} className={`px-2 py-1 hover:bg-blue-50 ${selectedClient === client ? 'bg-blue-50/60' : ''}`}>
                        <div className="flex items-center gap-1">
                          {selectedClient === client && activePropertyRole === 'Admin' && <button onClick={(e) => { e.stopPropagation(); setActivePropertyMenu(activePropertyMenu === client ? null : client); }} className="w-7 h-7 shrink-0 rounded-md hover:bg-slate-200 text-slate-500 font-bold" aria-label={`Options for ${client}`}>⋮</button>}
                          <button onClick={() => { setSelectedClient(client); setIsClientDropdownOpen(false); setActivePropertyMenu(null); }} className={`flex-1 min-w-0 text-left px-2 py-1.5 font-medium truncate ${selectedClient === client ? 'text-blue-600 font-bold' : 'text-slate-700'}`}>{client}</button>
                        </div>
                        {selectedClient === client && activePropertyRole === 'Admin' && activePropertyMenu === client && <div className="ml-2 mr-1 mb-1 rounded-lg border border-slate-200 bg-white shadow-sm p-1 flex flex-col">
                          <button onClick={() => { setPropertyAction({type:'rename',name:client}); setPropertyNameInput(client); setActivePropertyMenu(null); }} className="text-left px-3 py-2 rounded-md hover:bg-blue-100 text-xs text-slate-700 transition-colors duration-150">Rename</button>
                          <label className="px-3 py-2 rounded-md hover:bg-blue-100 text-xs text-slate-700 cursor-default transition-colors duration-150">Upload Logo<input type="file" accept="image/*" className="hidden" onChange={(e) => { const file=e.target.files?.[0]; if(file) setPropertyLogo(prev=>({...prev,[client]:URL.createObjectURL(file)})); setActivePropertyMenu(null); }} /></label>
                          <button onClick={() => { setPropertyAction({type:'delete',name:client}); setActivePropertyMenu(null); }} className="text-left px-3 py-2 rounded-md hover:bg-rose-50 text-xs text-rose-600">Delete Property</button>
                        </div>}
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-100 pt-1.5 px-2 mt-1">
                    <button 
                      onClick={() => {
                        setIsClientDropdownOpen(false);
                        setNewClientInputValue('');
                        setIsAddClientModalOpen(true);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-default"
                    >
                      <span>+</span> Add Property
                    </button>
                  </div>
                </div>
              )}
            </div>

            <span className="text-xs text-slate-500 font-medium hidden md:inline bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">{activePropertyRole}</span>
            </>}
          </div>

          {activeTab === 'dashboard' ? (
            viewingSavedReport ? (
              <div className="flex items-center gap-2 print:hidden">
                <span className="text-sm text-slate-500 mr-2">Read only snapshot</span>
                <button onClick={() => window.print()} className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50">Download PDF</button>
                <button onClick={closeSavedReport} className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">Back to Reports</button>
              </div>
            ) : (
            <div className="flex items-center gap-3 relative" ref={datePickerRef}>
              <div 
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-700 shadow-sm cursor-default hover:bg-slate-100 select-none"
              >
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span>{dateRange}</span>
                <span className="text-slate-400 text-xs">▼</span>
              </div>

              {/* POP-UP DATE PICKER INTERAKTIF */}
              {isDatePickerOpen && (
                <div className="absolute right-0 top-12 bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 z-50 flex gap-8 text-sm w-[720px]">
                  <div className="flex flex-col gap-4 flex-1 border-r border-slate-100 pr-6">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1 text-slate-500 font-bold">
                        <button type="button" aria-label="Previous year" onClick={() => setCalendarMonthOffset((value) => value - 12)} className="w-6 h-6 rounded hover:bg-slate-100">«</button>
                        <button type="button" aria-label="Previous month" onClick={() => setCalendarMonthOffset((value) => value - 1)} className="w-6 h-6 rounded hover:bg-slate-100">‹</button>
                      </div>
                      <span className="font-bold text-slate-900">{formatMonthHeading(calendarStartMonth)}</span>
                      <span className="font-bold text-slate-900">{formatMonthHeading(calendarCurrentMonth)}</span>
                      <div className="flex gap-1 text-slate-500 font-bold">
                        <button type="button" aria-label="Next month" onClick={() => setCalendarMonthOffset((value) => value + 1)} className="w-6 h-6 rounded hover:bg-slate-100">›</button>
                        <button type="button" aria-label="Next year" onClick={() => setCalendarMonthOffset((value) => value + 12)} className="w-6 h-6 rounded hover:bg-slate-100">»</button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      {renderCalendarMonth(calendarStartMonth, firstMonthDays)}
                      {renderCalendarMonth(calendarCurrentMonth, secondMonthDays)}
                    </div>

                    <p className="text-xs text-slate-400 mt-2">
                      {activeCompareInput ? (
                        <span className="text-rose-400 font-bold animate-pulse">
                          Click a date on the calendar to select the {activeCompareInput === 'start' ? 'Start' : 'End'} compare date
                        </span>
                      ) : (
                        <>Dates are shown in <strong>Asia/Makassar</strong> timezone <span className="text-blue-600 underline cursor-default">Change</span></>
                      )}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 w-72 justify-between">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-bold text-slate-800">Date Range</label>
                        <select 
                          value={datePreset}
                          onChange={(e) => handlePresetChange(e.target.value)}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-semibold text-slate-800 focus:outline-none focus:border-blue-500 cursor-default"
                        >
                          <option value="Custom">Custom</option>
                          <option value="Last 7 Days">Last 7 Days</option>
                          <option value="Last 30 Days">Last 30 Days</option>
                          <option value="This Month">This Month</option>
                        </select>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <input type="text" value={startDate} readOnly className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-center text-slate-700 font-medium" />
                          <input type="text" value={endDate} readOnly className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-center text-slate-700 font-medium" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 cursor-default select-none" onClick={() => setIsCompareEnabled(!isCompareEnabled)}>
                          <input 
                            type="checkbox" 
                            checked={isCompareEnabled} 
                            onChange={(e) => setIsCompareEnabled(e.target.checked)} 
                            className="accent-blue-600 w-4 h-4 cursor-default" 
                          />
                          <label className="font-bold text-slate-800 cursor-default">Compare To</label>
                        </div>
                        
                        {isCompareEnabled && (
                          <div className="flex flex-col gap-2">
                            <select 
                              value={compareMode}
                              onChange={(e) => handleCompareModeChange(e.target.value)}
                              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-semibold text-slate-800 focus:outline-none focus:border-blue-500 cursor-default"
                            >
                              <option value="Last Month">Last Month</option>
                              <option value="Last Year">Last Year</option>
                              <option value="Custom">Custom</option>
                            </select>

                            <div className="grid grid-cols-2 gap-2">
                              <input 
                                type="text" 
                                value={compareStartDate} 
                                readOnly={compareMode !== 'Custom'}
                                onClick={() => compareMode === 'Custom' && setActiveCompareInput('start')}
                                className={`border rounded-lg px-3 py-1.5 text-center font-medium transition-all ${
                                  compareMode === 'Custom' 
                                    ? `cursor-default ${activeCompareInput === 'start' ? 'border-rose-300 ring-2 ring-rose-50 bg-[#fff5f5]' : 'bg-slate-50 border-slate-200 hover:border-rose-200'}` 
                                    : 'bg-slate-100 border-slate-200 text-slate-400 cursor-default'
                                }`} 
                              />
                              <input 
                                type="text" 
                                value={compareEndDate} 
                                readOnly={compareMode !== 'Custom'}
                                onClick={() => compareMode === 'Custom' && setActiveCompareInput('end')}
                                className={`border rounded-lg px-3 py-1.5 text-center font-medium transition-all ${
                                  compareMode === 'Custom' 
                                    ? `cursor-default ${activeCompareInput === 'end' ? 'border-rose-300 ring-2 ring-rose-50 bg-[#fff5f5]' : 'bg-slate-50 border-slate-200 hover:border-rose-200'}` 
                                    : 'bg-slate-100 border-slate-200 text-slate-400 cursor-default'
                                }`} 
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-slate-100">
                      <button onClick={handleApplyDate} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-sm transition-all cursor-default">Apply</button>
                      <button onClick={() => setIsDatePickerOpen(false)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 rounded-lg transition-all cursor-default">Cancel</button>
                    </div>
                  </div>
                </div>
              )}

              <button 
                onClick={() => setIsSavedModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-default"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                <span>Save Report</span>
              </button>
            </div>
            )
          ) : (
            <div></div>
          )}
        </header>

        {/* CONTAINER UTAMA BAWAH */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
          
          {/* SUB-SIDEBAR HALAMAN (HANYA DI DASHBOARD) DENGAN ANIMASI LEBIH PELAN & ELEGAN */}
          {activeTab === 'dashboard' && !viewingSavedReport && (
            <aside className="w-64 bg-white border-r border-slate-200 p-4 flex flex-col gap-4 shrink-0 shadow-sm h-full overflow-y-auto">
              
              {/* Admin page controls; Members use this panel only for quick navigation. */}
              {!isActivePropertyUser && <div className="relative" ref={addPageDropdownRef}>
                <button 
                  onClick={() => setIsAddPageDropdownOpen(!isAddPageDropdownOpen)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-default select-none"
                >
                  <span>+</span> Add page
                </button>

                {isAddPageDropdownOpen && (
                  <div className="absolute left-0 top-12 w-full bg-white border border-slate-200 rounded-xl shadow-xl z-50 flex flex-col text-sm overflow-hidden">
                    <div className="px-3 pt-3 pb-2">
                      <input
                        type="text"
                        value={addPageSearch}
                        onChange={(e) => {
                          setAddPageSearch(e.target.value);
                          if (e.target.value.trim()) setIsAddPageSeeMoreOpen(true);
                        }}
                        placeholder="Search"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                    <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">SELECT PAGE TEMPLATE</div>
                    {(() => {
                      const pageTemplates = [
                        { title: 'Blank Page', label: 'Blank Page' },
                        { title: 'Google Analytics', label: 'Google Analytics' },
                        { title: 'Google Ads', label: 'Google Ads' },
                        { title: 'Meta Ads', label: 'Meta Ads' },
                        { title: 'Google Business Profile', label: 'Google Business Profile' },
                        { title: 'YouTube Analytics', label: 'YouTube Analytics' },
                        { title: 'Facebook Pages', label: 'Facebook Pages' },
                        { title: 'Instagram Professional', label: 'Instagram' },
                        { title: 'TikTok Organic', label: 'TikTok Organic' },
                        { title: 'TikTok Ads', label: 'TikTok Ads' },
                      ];
                      const filteredTemplates = pageTemplates.filter((template) =>
                        template.label.toLowerCase().includes(addPageSearch.trim().toLowerCase())
                      );
                      const initialTemplates = filteredTemplates.filter((template) =>
                        ['Blank Page', 'Google Analytics', 'Google Ads', 'Meta Ads'].includes(template.title)
                      );
                      const additionalTemplates = filteredTemplates.filter((template) =>
                        !['Blank Page', 'Google Analytics', 'Google Ads', 'Meta Ads'].includes(template.title)
                      );
                      const visibleTemplates = addPageSearch.trim() || isAddPageSeeMoreOpen
                        ? filteredTemplates
                        : initialTemplates;
                      return (
                        <>
                          <div className="flex flex-col overflow-y-auto max-h-64 py-1">
                            {visibleTemplates.map((template) => (
                              <button
                                key={template.title}
                                onClick={() => {
                                  const newPageId = 'p_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
                                  const newPage = { id: newPageId, title: template.title, active: true, ...(template.title !== 'Blank Page' ? { sourceTitle: template.title } : { isCustom: true }) };
                                  const canonicalPage = defaultDashboardRef.current?.reportPages?.find((item) => item.title === template.title);
                                  const canonicalMetrics = template.title === 'Blank Page' ? [] : (defaultDashboardRef.current?.dashboardMetrics || []).filter((metric) => metric.pageId === canonicalPage?.id);
                                  setReportPages((pages) => [...pages.map((page) => ({ ...page, active: false })), newPage]);
                                  if (canonicalMetrics.length) {
                                    setDashboardMetrics((current) => [
                                      ...current,
                                      ...canonicalMetrics.map((metric, index) => ({ ...metric, id: makeMetricId(), pageId: newPageId, col: metric.col ?? 0, row: metric.row ?? index })),
                                    ]);
                                  }
                                  setIsAddPageDropdownOpen(false);
                                  setIsAddPageSeeMoreOpen(false);
                                  setAddPageSearch('');
                                  requestAnimationFrame(() => reportPaperRefs.current[newPageId]?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
                                }}
                                className="px-3 py-2 hover:bg-blue-50 hover:text-blue-600 text-slate-700 font-normal text-left transition-colors cursor-default flex items-center gap-2"
                              >
                                {template.label}
                              </button>
                            ))}
                            {visibleTemplates.length === 0 && (
                              <div className="px-3 py-4 text-xs text-slate-400 text-center">No pages found</div>
                            )}
                          </div>
                          {!addPageSearch.trim() && (
                            <button
                              type="button"
                              onClick={() => setIsAddPageSeeMoreOpen((value) => !value)}
                              className="border-t border-slate-100 py-2.5 px-3 flex items-center justify-center text-xs text-slate-400 font-semibold hover:text-slate-600"
                            >
                              {isAddPageSeeMoreOpen ? 'See Less' : 'See More'}
                              <span className="text-[10px] ml-1">{isAddPageSeeMoreOpen ? '▲' : '▼'}</span>
                            </button>
                          )}
                        </>
                      );
                    })()}
                  </div>
                )}
              </div>}

              <div ref={pagesContainerRef} className={`flex flex-col gap-2.5 ${isActivePropertyUser ? 'mt-0' : 'mt-2'} overflow-y-auto flex-1 pr-0.5 relative`}>
                {visibleReportPages.map((page) => {
                  const isDragging = draggedPageId === page.id;

                  return (
                    <div
                      key={page.id}
                      ref={(el) => { pageItemsRef.current[page.id] = el; }}
                      onPointerDown={(e) => { if (!isActivePropertyUser) handlePagePointerDown(e, page); }}
                      onClick={() => {
                        if (!didMovePageRef.current && editingPageId !== page.id) {
                          setReportPages((prev) => prev.map(p => ({ ...p, active: p.id === page.id })));
                          reportPaperRefs.current[page.id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                        didMovePageRef.current = false;
                      }}
                      style={{ transitionDuration: '150ms', touchAction: 'pan-y' }}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-default transition-all ease-out border select-none group relative ${
                        isDragging ? 'opacity-30 border-2 border-dashed border-blue-400 bg-blue-50/40 shadow-inner' :
                        page.active ? 'bg-blue-50 border-blue-200 text-blue-700 font-medium shadow-sm' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate flex-1 mr-2">
                        {!isActivePropertyUser && <span className="text-slate-300 group-hover:text-slate-500 font-bold tracking-tighter text-xs cursor-default">
                          ⋮⋮
                        </span>}
                        
                        {editingPageId === page.id ? (
                          <input 
                            type="text" 
                            autoFocus
                            value={editingPageTitle}
                            onChange={(e) => setEditingPageTitle(e.target.value)}
                            onBlur={() => {
                              if (editingPageTitle.trim() !== '') {
                                setReportPages(reportPages.map(p => p.id === page.id ? { ...p, title: editingPageTitle.trim() } : p));
                              }
                              setEditingPageId(null);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                if (editingPageTitle.trim() !== '') {
                                  setReportPages(reportPages.map(p => p.id === page.id ? { ...p, title: editingPageTitle.trim() } : p));
                                }
                                setEditingPageId(null);
                              } else if (e.key === 'Escape') {
                                setEditingPageId(null);
                              }
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white border border-blue-500 rounded px-2 py-0.5 text-xs font-medium text-slate-900 focus:outline-none w-full shadow-sm"
                          />
                        ) : (
                          <span className="flex items-center gap-1.5 min-w-0 truncate">
                            <span className="truncate">{page.title}</span>
                            {getPageIntegrationStatus(page.sourceTitle || page.title.replace(/ \(Copy(?: \d+)?\)$/i, '')) === 'Disconnected' && (
                              <span
                                className="inline-flex items-center justify-center shrink-0 text-amber-600"
                                title="Integration disconnected. Reconnect this data source to restore live data."
                                aria-label="Integration disconnected"
                              >
                                <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                                  <path fillRule="evenodd" d="M9.13 2.74a1 1 0 0 1 1.74 0l7.2 12.6A1 1 0 0 1 17.2 16.8H2.8a1 1 0 0 1-.87-1.46l7.2-12.6ZM10 7a.85.85 0 0 0-.85.85v3.3a.85.85 0 1 0 1.7 0v-3.3A.85.85 0 0 0 10 7Zm0 7.1a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" clipRule="evenodd" />
                                </svg>
                              </span>
                            )}
                          </span>
                        )}
                      </div>

                      {!isActivePropertyUser && <div className="relative page-menu-container" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePageMenuId(activePageMenuId === page.id ? null : page.id);
                          }}
                          className="text-slate-400 hover:text-slate-700 px-1 font-bold cursor-default"
                        >
                          ···
                        </button>

                        {activePageMenuId === page.id && (
                          <div className="absolute right-0 top-7 w-44 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-50 text-left text-xs flex flex-col">
                            <button 
                              onClick={() => {
                                setReportPages(reportPages.map(p => ({ ...p, active: p.id === page.id })));
                                reportPaperRefs.current[page.id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                setActivePageMenuId(null);
                              }}
                              className="px-4 py-2 hover:bg-slate-50 text-slate-700 font-medium text-left cursor-default"
                            >
                              View
                            </button>
                            <button 
                              onClick={() => {
                                setEditingPageId(page.id);
                                setEditingPageTitle(page.title);
                                setActivePageMenuId(null);
                              }}
                              className="px-4 py-2 hover:bg-slate-50 text-slate-700 font-medium text-left cursor-default"
                            >
                              Rename
                            </button>
                            <button 
                              onClick={() => {
                                const duplicatedId = 'p_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
                                const duplicated = { ...page, id: duplicatedId, ...(page.isCustom ? { isCustom: true } : { sourceTitle: page.sourceTitle || page.title }), title: `${page.title} (Copy)`, active: true, isCover: page.title === 'Cover Page' || page.isCover === true };
                                const idx = reportPages.findIndex(p => p.id === page.id);
                                const updated = [...reportPages];
                                updated.splice(idx + 1, 0, duplicated);
                                setReportPages(updated.map((item) => ({ ...item, active: item.id === duplicatedId })));
                                setDashboardMetrics((current) => [
                                  ...current,
                                  ...current.filter((metric) => metric.pageId === page.id).map((metric) => ({
                                    ...metric,
                                    id: makeMetricId(),
                                    pageId: duplicatedId,
                                  })),
                                ]);
                                setActivePageMenuId(null);
                                requestAnimationFrame(() => reportPaperRefs.current[duplicatedId]?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
                              }}
                              className="px-4 py-2 hover:bg-slate-50 text-slate-700 font-medium text-left cursor-default"
                            >
                              Duplicate
                            </button>
                            <button 
                              onClick={() => restorePageDefault(page)}
                              className="px-4 py-2 hover:bg-slate-50 text-slate-700 font-medium text-left cursor-default"
                            >
                              Restore Default
                            </button>
                            <button 
                              onClick={() => restorePageLast(page)}
                              className="px-4 py-2 hover:bg-slate-50 text-slate-700 font-medium text-left cursor-default"
                            >
                              Restore Last
                            </button>
                            <button 
                              onClick={() => {
                                setPageToDelete(page);
                                setIsDeletePageModalOpen(true);
                                setActivePageMenuId(null);
                              }}
                              className="px-4 py-2 hover:bg-rose-50 text-rose-600 font-semibold border-t border-slate-100 text-left mt-1 cursor-default"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>}
                    </div>
                  );
                })}

                {/* Floating drag preview locked to the original sidebar X position and width. */}
                {!isActivePropertyUser && draggedPageId && (() => {
                  const draggedPage = reportPages.find((p) => p.id === draggedPageId);
                  if (!draggedPage) return null;
                  return (
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'fixed',
                        top: `${dragY}px`,
                        left: `${dragBoxLeft}px`,
                        width: `${dragBoxWidth}px`,
                        pointerEvents: 'none',
                        zIndex: 9999,
                      }}
                      className="flex items-center justify-between p-3 rounded-xl bg-white border-2 border-blue-500 text-blue-700 font-bold shadow-2xl scale-[1.02] opacity-95"
                    >
                      <div className="flex items-center gap-2.5 truncate flex-1 mr-2">
                        <span className="text-blue-500 font-bold tracking-tighter text-xs">⋮⋮</span>
                        <span className="truncate">{draggedPage.title}</span>
                      </div>
                      <span className="text-slate-400 px-1 font-bold">···</span>
                    </div>
                  );
                })()}
              </div>
            </aside>
          )}

          {/* REPORT CANVAS: continuous vertical stack of paper pages */}
          {activeTab === 'dashboard' && (
            <main id="report-print-root" ref={reportScrollRef} className={`flex-1 min-w-0 px-6 md:px-8 pt-5 pb-10 flex flex-col items-center gap-5 overflow-y-auto h-full bg-slate-100/70 scroll-smooth ${isActivePropertyUser && !viewingSavedReport ? 'max-w-7xl w-full mx-auto' : ''} ${viewingSavedReport ? 'saved-report-readonly' : ''}`}>
              {visibleReportPages.map((page) => (
                <section
                  key={page.id}
                  ref={(el) => { reportPaperRefs.current[page.id] = el; if (page.active && el) { const grid = el.querySelector('[data-metric-grid]'); if (grid) metricCanvasRef.current = grid; } }}
                  data-report-page={page.id}
                  className={`relative shrink-0 w-full ${viewingSavedReport ? 'max-w-[1120px]' : ''} ${isActivePropertyUser && !viewingSavedReport ? 'goa-user-dashboard-page' : ''} ${!(page.title === 'Cover Page' || page.isCover) ? 'goa-dashboard-page' : ''} rounded-xl border border-slate-200 bg-white shadow-[0_5px_18px_rgba(15,23,42,0.08)] p-4 md:p-5`}
                >
                  {page.title === 'Cover Page' || page.isCover ? (
                    <div className="min-h-[620px] flex flex-col items-center justify-center text-center px-8 py-16">
                      <div className="w-20 h-20 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center mb-8 text-slate-400 overflow-hidden">
                        {propertyLogo[selectedClient] ? <img src={propertyLogo[selectedClient]} alt={`${selectedClient} logo`} className="w-full h-full object-contain" /> : <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M4 20V5l8-3 8 3v15M8 20v-5h8v5M8 8h.01M16 8h.01" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                      <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400 mb-4">{selectedClient}</div>
                      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">Digital Marketing Report</h1>
                      <div className="w-16 h-1 bg-blue-600 rounded-full my-7"></div>
                      <p className="text-base text-slate-500">{dateRange || 'Reporting Period'}</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between gap-4 mb-4 px-1">
                        <div>
                          <h1 className="text-base font-bold text-slate-900">{page.title === 'Google Analytics' ? 'Google Analytics Performance' : page.title + ' Performance'}</h1>
                          <p className="text-[10px] text-slate-400 mt-1">Reporting period · {dateRange || 'Selected date range'}</p>
                        </div>
                        <span className="text-[10px] text-slate-400">Demo data</span>
                      </div>
                      {getPageIntegrationStatus(page.sourceTitle || page.title.replace(/ \(Copy(?: \d+)?\)$/i, '')) === 'Disconnected' && (
                        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 overflow-hidden">
                          <svg viewBox="0 0 240 220" className="w-[min(36vw,340px)] h-auto text-red-600 opacity-[0.19] drop-shadow-sm" fill="currentColor">
                            <path d="M120 12 226 198H14L120 12Z" />
                            <path d="M120 72v62" fill="none" stroke="white" strokeWidth="17" strokeLinecap="round" />
                            <circle cx="120" cy="160" r="10" fill="white" />
                          </svg>
                          <span className="text-red-600/35 font-extrabold tracking-[0.22em] text-sm md:text-base text-center">ACCOUNT INTEGRATION REQUIRED</span>
                        </div>
                      )}
                      <div
                        data-metric-grid
                        ref={(el) => { if (page.active) metricCanvasRef.current = el; }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          const dragTypes = Array.from(e.dataTransfer.types || []);
                          if (!dragTypes.includes('application/getone-metric') && !dragTypes.includes('text/plain') && !draggedNewMetricRef.current) return;
                          // Browsers may hide DataTransfer payload during dragover, so use the drag-start ref first.
                          let dragged = draggedNewMetricRef.current || {};
                          if (!dragged.platform || !dragged.name) {
                            const raw = e.dataTransfer.getData('application/getone-metric') || e.dataTransfer.getData('text/plain');
                            try { dragged = raw ? JSON.parse(raw) : dragged; } catch (_) {}
                          }
                          if (!dragged?.platform || !dragged?.name) return;
                          const allowedTypes = getMetricTypeOptions(dragged.platform, dragged.name);
                          const { w, h } = getDefaultMetricConfig(dragged.platform, dragged.name, allowedTypes);
                          const pos = getGridDropPosition(e.currentTarget, e.clientX, e.clientY, w, h);
                          if (!metricDragPreview || metricDragPreview.pageId !== page.id || metricDragPreview.col !== pos.col || metricDragPreview.row !== pos.row || metricDragPreview.w !== w || metricDragPreview.h !== h) captureMetricRects();
                          setMetricDragPreview({ pageId: page.id, col: pos.col, row: pos.row, w, h, platform: dragged.platform, name: dragged.name });
                        }}
                        onDragLeave={(e) => {
                          if (!e.currentTarget.contains(e.relatedTarget)) {
                            setMetricDragPreview((prev) => prev?.pageId === page.id ? null : prev);
                          }
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          const payload = e.dataTransfer.getData('application/getone-metric') || e.dataTransfer.getData('text/plain');
                          let dragged = draggedNewMetricRef.current;
                          try { if (payload) dragged = JSON.parse(payload); } catch (_) {}
                          if (!dragged?.platform || !dragged?.name) { setMetricDragPreview(null); draggedNewMetricRef.current = null; return; }
                          const { platform, name } = dragged;
                          const allowedTypes = getMetricTypeOptions(platform, name);
                          const { w, h } = getDefaultMetricConfig(platform, name, allowedTypes);
                          const pos = getGridDropPosition(e.currentTarget, e.clientX, e.clientY, w, h);
                          captureMetricRects();
                          setReportPages((prev) => prev.map((p) => ({ ...p, active: p.id === page.id })));
                          addDashboardMetric(platform, name, pos.col, pos.row, page.id);
                          setMetricDragPreview(null);
                          draggedNewMetricRef.current = null;
                        }}
                        className="relative grid grid-cols-4 gap-3 content-start rounded-lg border border-slate-100 bg-white p-1"
                        style={{ gridAutoRows: `${metricCellHeight}px`, minHeight: `${getPageGridHeight(page.id)}px` }}
                      >
                        {metricDragPreview?.pageId === page.id && (
                          <div aria-hidden="true" className="pointer-events-none rounded-xl border-2 border-dashed border-blue-500 bg-blue-50/80 shadow-[0_4px_14px_rgba(37,99,235,0.12)] z-10 transition-all duration-200 ease-out" style={{ gridColumn: `${metricDragPreview.col + 1} / span ${metricDragPreview.w}`, gridRow: `${metricDragPreview.row + 1} / span ${metricDragPreview.h}`, minHeight: `${metricDragPreview.h * metricCellHeight + (metricDragPreview.h - 1) * 12}px`, alignSelf: 'stretch', animation: 'goaDropPulse 1s ease-in-out infinite' }} />
                        )}
                        {dashboardMetrics.filter((m) => m.pageId === page.id).length === 0 && (
                          <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs text-slate-400">Choose a metric from the panel to customise this page.</div>
                        )}
                {(() => {
                  const previewLayout = getPreviewLayoutForPage(page.id);
                  return dashboardMetrics.filter((metric) => metric.pageId === page.id).map((originalMetric) => {
                  const metric = previewLayout?.get(originalMetric.id) || originalMetric;
                  const isCompact = metric.w === 1 && metric.h === 1;
                  const isLarge = metric.w >= 2 || metric.h >= 2;
                  const val = metricValueFor(metric.name);
                  const points = [24, 20, 25, 13, 17, 8, 12, 4, 9];
                  return (
                    <div key={metric.id} data-metric-id={metric.id} className={`relative min-w-0 min-h-0 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col ${openMetricMenuId === metric.id ? "z-40" : "z-0"}`} style={{ gridColumn: `${metric.col + 1} / span ${metric.w}`, gridRow: `${metric.row + 1} / span ${metric.h}`, transition: 'grid-column 220ms cubic-bezier(0.22, 1, 0.36, 1), grid-row 220ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 180ms ease, transform 320ms cubic-bezier(0.22, 1, 0.36, 1)', willChange: 'transform' }}>
                      <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-slate-100">
                        <span className="text-xs font-semibold text-slate-700 truncate">{metric.name}</span>
                        <div data-metric-menu-container className="relative shrink-0">
                          <button type="button" aria-label="Move metric or open menu" onPointerDown={(e) => startMetricPointerInteraction(e, metric, 'drag')} onClick={() => { if (metricSuppressClickRef.current) { metricSuppressClickRef.current = false; return; } setOpenMetricMenuId(openMetricMenuId === metric.id ? null : metric.id); }} className="shrink-0 w-6 h-6 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-500 cursor-default active:cursor-default select-none touch-none" title="Drag to move · click for options">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/></svg>
                          </button>
                          {openMetricMenuId === metric.id && (
                            <div className="absolute right-0 top-8 z-[60] w-44 rounded-xl border border-slate-200 bg-white shadow-xl p-1.5">
                              {(metric.allowedTypes || getMetricTypeOptions(metric.platform, metric.name)).map((type) => <button key={type} type="button" onClick={() => changeMetricType(metric.id, type)} className={`w-full text-left text-xs px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 ${metric.type === type ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700'}`}>{type}</button>)}
                              <div className="h-px bg-slate-100 my-1" />
                              <button type="button" onClick={() => { setMetricPendingDelete(metric); setOpenMetricMenuId(null); }} className="w-full text-left text-xs px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 font-semibold">Delete</button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div data-metric-content className="flex-1 min-h-0 p-3 flex flex-col overflow-hidden">
                        {metric.type === 'Table' && (() => {
                          const table = sortedMetricTable(metric);
                          const available = relatedTableMetrics(metric);
                          const filtered = available.filter((name) => name.toLowerCase().includes(tableMetricSearch.toLowerCase()));
                          const tableColumnKeys = table.headers.map((header, index) => `${header}__${table.headers.slice(0, index + 1).filter((item) => item === header).length - 1}`);
                          return <div className="w-full flex-1 min-h-0 overflow-auto text-[14px] text-slate-600 overscroll-y-auto">
                            <table data-table-column-grid className="w-full min-w-max border-collapse text-left">
                              <thead className="sticky top-0 z-[2] bg-white"><tr className="text-slate-500 border-b border-slate-200">
                                {table.headers.map((h, columnIndex) => <th key={`${h}-${columnIndex}`} data-table-col-key={tableColumnKeys[columnIndex]} data-table-column-index={columnIndex} data-table-menu-container className={`relative font-semibold py-2 pr-3 whitespace-nowrap ${tableColumnDrag?.metricId === metric.id && tableColumnDrag.currentIndex === columnIndex ? 'opacity-30 bg-blue-50' : ''}`}>
                                  <button type="button" onPointerDown={(e) => startTableColumnPointerDrag(e, metric, columnIndex, h)} onClick={() => { if (tableColumnSuppressClickRef.current) { tableColumnSuppressClickRef.current = false; return; } setOpenTableMetricMenuId(null); setOpenTableColumnMenu(openTableColumnMenu?.metricId === metric.id && openTableColumnMenu?.columnIndex === columnIndex ? null : { metricId: metric.id, columnIndex }); }} className={`rounded px-1 py-1 -ml-1 cursor-default select-none touch-none hover:bg-slate-100 hover:text-slate-800 ${tableColumnDrag?.metricId === metric.id && tableColumnDrag?.currentIndex === columnIndex ? 'bg-slate-100 text-slate-700' : ''}`} title="Click for options · hold and move to reorder">{h}</button>
                                  {openTableColumnMenu?.metricId === metric.id && openTableColumnMenu?.columnIndex === columnIndex && <div className="absolute left-0 top-full z-[90] w-40 flex flex-col rounded-lg border border-slate-200 bg-white shadow-lg p-1 text-left font-normal">
                                    {tableSortOptions(table, columnIndex).map((option) => <button key={option.label} type="button" onClick={() => sortTableColumn(metric, columnIndex, option.direction)} className="block w-full text-left text-[13px] leading-4 font-normal px-2 py-1 rounded-md text-slate-700 hover:bg-blue-50">{option.label}</button>)}
                                    {columnIndex > 0 && <><div className="h-px bg-slate-100 my-1"/><button type="button" onClick={() => deleteTableColumn(metric, columnIndex)} className="block w-full text-left text-[13px] leading-4 font-normal px-2 py-1 rounded-md text-red-600 hover:bg-red-50">Delete</button></>}
                                  </div>}
                                </th>)}
                                <th data-table-menu-container className="sticky right-0 z-[3] bg-white w-9 min-w-9 px-1 py-1 text-center">
                                  <div className="relative flex justify-center">
                                    <button type="button" aria-label="Add related metric column" title="Add related metric" onClick={() => { setOpenTableColumnMenu(null); setOpenTableMetricMenuId(openTableMetricMenuId === metric.id ? null : metric.id); setTableMetricSearch(''); }} className="w-7 h-7 rounded-md border border-transparent hover:border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-blue-600 text-lg leading-none font-medium">+</button>
                                    {openTableMetricMenuId === metric.id && <div className="absolute right-0 top-8 z-[80] w-44 rounded-lg border border-slate-200 bg-white shadow-lg p-1 text-left text-[13px] font-normal" onClick={(e) => e.stopPropagation()}>
                                      <div className="flex items-center gap-1.5 px-1.5 py-1 mb-1 rounded-md border border-slate-200 bg-white">
                                        <svg className="w-3.5 h-3.5 shrink-0 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
                                        <input autoFocus value={tableMetricSearch} onChange={(e) => setTableMetricSearch(e.target.value)} placeholder="Search metrics..." className="w-full min-w-0 outline-none text-[13px] leading-4 font-normal text-slate-700 placeholder:text-slate-400" />
                                      </div>
                                      <div className="max-h-40 overflow-y-auto">
                                        {filtered.length ? filtered.map((name) => <button key={name} type="button" onClick={() => addRelatedTableMetric(metric, name)} className="w-full text-left text-[13px] leading-4 font-normal px-2 py-1 rounded-md text-slate-700 hover:bg-blue-50 hover:text-blue-700">{name}</button>) : <div className="px-2 py-1 text-[13px] leading-4 font-normal text-slate-400">No related metrics found</div>}
                                      </div>
                                    </div>}
                                  </div>
                                </th>
                              </tr></thead>
                              <tbody>{table.rows.map((row, i) => <tr key={i} className="border-b border-slate-100">{row.map((value, j) => <td key={j} data-table-col-key={tableColumnKeys[j]} className={`py-2 pr-3 whitespace-nowrap ${tableColumnDrag?.metricId === metric.id && tableColumnDrag.currentIndex === j ? 'opacity-30 bg-blue-50/60' : ''}`}>{value}</td>)}<td className="sticky right-0 bg-white" /></tr>)}</tbody>
                            </table>
                          </div>;
                        })()}
                        {(metric.type === 'Number' || metric.type === 'Number and Chart') && !['Traffic Acquisition', 'Top Landing Pages'].includes(metric.name) && <div className="flex items-end justify-between gap-2"><div><span className={`${isCompact ? 'text-xl' : 'text-2xl'} font-black tracking-tight text-slate-900`}>{val}</span>{isCompareEnabled && <div className="text-[9px] text-slate-500 mt-0.5">vs <b className="text-slate-700">{metricValueFor(metric.name).replace(/[0-9]/g, (d) => String(Math.max(0, Number(d)-1)))}</b></div>}</div><span className="text-[10px] font-semibold text-emerald-600 whitespace-nowrap rounded-full bg-emerald-50 px-2 py-1">↗ 12.6%</span></div>}
                        {(metric.type === 'Line Chart' || metric.type === 'Number and Chart') && !['Traffic Acquisition', 'Top Landing Pages'].includes(metric.name) && (
                          <div className={`${isCompact ? 'h-7 mt-1' : 'flex-1 min-h-[40px] mt-2'} w-full`}>
                            <svg viewBox="0 0 200 55" preserveAspectRatio="none" className="w-full h-full">{isCompareEnabled && <path d={points.map((y,i)=>`${i===0?'M':'L'} ${i*25} ${Math.min(48,y*1.8+7)}`).join(' ')} fill="none" stroke="#cbd5e1" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" /> }<path d={points.map((y,i)=>`${i===0?'M':'L'} ${i*25} ${y*1.8}`).join(' ')} fill="none" stroke="#2563eb" strokeWidth="2.25" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </div>
                        )}
                        {metric.type === 'Bar Chart' && <div className="flex-1 min-h-0 flex flex-col justify-center gap-2 py-2 overflow-y-auto">{isCompareEnabled && <div className="flex justify-end gap-3 text-[8px] text-slate-400"><span><i className="inline-block w-2 h-2 rounded-full bg-blue-600 mr-1"/>Current</span><span><i className="inline-block w-2 h-2 rounded-full bg-slate-300 mr-1"/>Previous</span></div>}{metricBreakdown(metric).map((item,i,arr)=><div key={item.label} className="min-w-0 text-[10px] text-slate-600"><div className="flex items-center justify-between gap-2 mb-1"><span className="truncate">{item.label}</span><span className="tabular-nums text-slate-800 font-semibold text-right shrink-0">{Math.round(item.value*112.7).toLocaleString()}{isCompareEnabled && <span className="ml-1 text-slate-400 font-normal">({Math.round(item.value*96.9).toLocaleString()})</span>}</span></div><div className="h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-full rounded-full bg-blue-600" style={{width:`${item.value/Math.max(...arr.map(x=>x.value))*100}%`}} /></div>{isCompareEnabled && <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden mt-1"><div className="h-full rounded-full bg-slate-300" style={{width:`${Math.max(8,(item.value*0.86)/Math.max(...arr.map(x=>x.value))*100)}%`}} /></div>}</div>)}</div>}
                        {metric.type === 'Maps' && (metric.name === 'Campaign by Country' ? <div className="flex-1 min-h-0 grid grid-cols-[1.1fr_1fr] gap-3 overflow-hidden"><div className="min-h-0 rounded-lg bg-slate-50 overflow-hidden relative"><svg viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet" className="w-full h-full"><g fill="#dbeafe" stroke="#bfdbfe" strokeWidth="1"><path d="M35 65 L75 38 130 42 158 70 145 105 118 119 103 157 78 145 60 111 38 99Z"/><path d="M145 155 L178 164 194 202 183 244 164 226 155 190Z"/><path d="M250 60 L280 42 315 49 329 67 312 82 284 79 272 96 248 87Z"/><path d="M275 98 L316 88 348 107 353 146 330 180 308 166 293 137Z"/><path d="M328 52 L380 35 450 47 495 70 532 93 510 119 472 115 444 132 410 119 385 94 354 89Z"/><path d="M450 158 L486 149 522 166 535 193 511 216 481 208 462 186Z"/></g><g fill="#2563eb" opacity=".9">{[[105,86],[116,104],[175,194],[303,111],[320,129],[389,93],[424,105],[480,185],[500,194],[350,126]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i===0?6:4}/>)}</g></svg></div><div className="min-w-0 overflow-auto text-[9px] text-slate-600"><table className="w-full text-left"><thead className="sticky top-0 bg-white"><tr className="border-b border-slate-200"><th className="py-1 pr-2">Country</th><th className="py-1 pr-2 text-right">Clicks</th><th className="py-1 text-right">Cost</th></tr></thead><tbody>{[['Indonesia','9,820','IDR 42,301,400'],['Australia','3,740','IDR 16,280,600'],['United States','2,690','IDR 11,607,800'],['Singapore','1,820','IDR 7,862,400'],['United Kingdom','1,120','IDR 4,928,100']].map((r,i)=><tr key={i} className="border-b border-slate-100"><td className="py-1 pr-2 whitespace-nowrap">{r[0]}</td><td className="py-1 pr-2 text-right">{r[1]}</td><td className="py-1 text-right whitespace-nowrap">{r[2]}</td></tr>)}</tbody></table></div></div> : <div className="flex-1 min-h-[110px] rounded-lg bg-slate-50 overflow-hidden relative"><svg viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet" className="w-full h-full"><g fill="#dbeafe" stroke="#bfdbfe" strokeWidth="1"><path d="M35 65 L75 38 130 42 158 70 145 105 118 119 103 157 78 145 60 111 38 99Z"/><path d="M145 155 L178 164 194 202 183 244 164 226 155 190Z"/><path d="M250 60 L280 42 315 49 329 67 312 82 284 79 272 96 248 87Z"/><path d="M275 98 L316 88 348 107 353 146 330 180 308 166 293 137Z"/><path d="M328 52 L380 35 450 47 495 70 532 93 510 119 472 115 444 132 410 119 385 94 354 89Z"/><path d="M450 158 L486 149 522 166 535 193 511 216 481 208 462 186Z"/></g><g fill="#2563eb" opacity=".9">{[[105,86],[116,104],[175,194],[303,111],[320,129],[389,93],[424,105],[480,185],[500,194],[350,126]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i===0?6:4}/>)}</g></svg><div className="absolute bottom-2 left-3 flex items-center gap-2 text-[9px] text-slate-500"><span className="w-2 h-2 rounded-full bg-blue-600"/>Audience / activity locations</div></div>)}
                        {metric.type === 'Pie Chart' && <div className={`flex-1 min-h-0 min-w-0 flex items-center ${isCompact ? 'justify-center gap-2' : 'justify-start gap-0'}`}>{(() => { const items = metricBreakdown(metric); const total = items.reduce((a,b)=>a+b.value,0); let offset = 0; const colors = ['#2563eb','#22c55e','#a855f7','#93c5fd','#f59e0b']; const ring = isCompact ? 'w-[104px] h-[104px]' : 'h-[calc(100%-10px)] max-h-[260px] aspect-square w-auto max-w-full'; const chartZone = isCompact ? '' : 'h-full min-h-0 min-w-0 flex-[0_0_62%] flex items-center justify-start pl-1 overflow-hidden'; const legendZone = isCompact ? '' : 'h-full min-h-0 min-w-0 flex-[0_0_38%] flex flex-col justify-center pr-2 overflow-hidden'; const donut = <div className={`relative shrink-0 ${ring}`}><svg viewBox="0 0 100 100" className="w-full h-full block"><circle cx="50" cy="50" r="41" fill="none" stroke="#e2e8f0" strokeWidth="18"/>{items.map((item,i)=>{const dash=item.value/total*257.6;const el=<circle key={item.label} cx="50" cy="50" r="41" fill="none" stroke={colors[i%colors.length]} strokeWidth="18" strokeDasharray={`${dash} ${257.6-dash}`} strokeDashoffset={-offset} transform="rotate(-90 50 50)"/>;offset+=dash;return el;})}</svg>{!isCompact && <div className="absolute inset-0 flex flex-col items-center justify-center text-center"><span className="text-base font-bold text-slate-800 leading-tight">{val}</span><span className="text-[8px] text-slate-400">{metric.name.includes('Result')?'Results':'Total'}</span></div>}</div>; return <>{isCompact ? <>{donut}<div className="min-w-0 flex flex-col justify-center"><span className="text-lg font-extrabold leading-tight text-slate-900">{val}</span><span className="text-[8px] text-slate-400">{metric.name.includes('Result')?'Results':'Total'}</span>{items.slice(0,3).map((item,i)=><div key={item.label} className="flex items-center gap-1 mt-1 text-[7px] text-slate-500"><span className="w-1.5 h-1.5 rounded-full shrink-0" style={{background:colors[i%colors.length]}}/><span className="truncate">{Math.round(item.value/total*100)}%</span></div>)}</div></> : <><div className={chartZone}>{donut}</div><div className={`${legendZone} gap-y-2 text-[10px] text-slate-600`}>{items.map((item,i)=><div key={item.label} className="flex w-full min-w-0 items-center gap-1.5 overflow-hidden"><span className="w-2 h-2 rounded-full shrink-0" style={{background:colors[i%colors.length]}}/><span className="flex-1 min-w-0 truncate">{item.label}</span><b className="shrink-0 text-slate-800 text-right">{Math.round(item.value/total*100)}%{isCompareEnabled && <span className="block text-slate-400 font-normal">{Math.max(1,Math.round(item.value/total*100*0.92))}%</span>}</b></div>)}</div></>}</>; })()}</div>}
                        {isLarge && (metric.type === 'Line Chart' || metric.type === 'Number and Chart') && <div className="flex justify-between text-[9px] text-slate-400 mt-1 pt-1 border-t border-slate-100"><span>1 Oct</span><span>7 Oct</span><span>14 Oct</span><span>Today</span></div>}
                      </div>
                      <button type="button" aria-label="Resize metric" onPointerDown={(e) => startMetricPointerInteraction(e, metric, 'resize')} className="absolute bottom-0 right-0 w-5 h-5 cursor-default touch-none flex items-end justify-end p-1 text-slate-400 hover:text-blue-600" title="Drag to resize"><svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor"><path d="M11 1v10H1z"/></svg></button>
                    </div>
                  );
                });
                })()}
                      </div>
                    </>
                  )}
                </section>
              ))}
            </main>
          )}

          {/* HALAMAN REPORTS (DENGAN INLINE RENAME) */}
          {activeTab === 'reports' && (
            <main className="flex-1 p-6 md:p-8 flex flex-col gap-6 max-w-7xl w-full mx-auto overflow-y-auto h-full pb-24">
              <h1 className="text-xl font-bold text-slate-900">Report</h1>
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-semibold bg-slate-50/30">
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Download</th>
                      <th className="py-3 px-4">Property</th>
                      <th className="py-3 px-4">User</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Created</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                    {reportList.filter((rep) => rep.client === selectedClient || (rep.type === 'Demo' && rep.propertyClient === selectedClient)).sort((a, b) => {
                      if (a.type === 'Demo') return 1;
                      if (b.type === 'Demo') return -1;
                      return new Date(b.created) - new Date(a.created);
                    }).map((rep, index, visibleReports) => {
                      const isNearBottom = index >= visibleReports.length - 2;
                      const isEditingThisReport = editingReportId === rep.id;

                      return (
                        <tr key={rep.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 px-4">
                            {isEditingThisReport ? (
                              <input 
                                type="text"
                                autoFocus
                                value={editingReportNameValue}
                                onChange={(e) => setEditingReportNameValue(e.target.value)}
                                onBlur={() => {
                                  if (editingReportNameValue.trim() !== '') {
                                    setReportList(reportList.map(r => r.id === rep.id ? { ...r, name: editingReportNameValue.trim() } : r));
                                  }
                                  setEditingReportId(null);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    if (editingReportNameValue.trim() !== '') {
                                      setReportList(reportList.map(r => r.id === rep.id ? { ...r, name: editingReportNameValue.trim() } : r));
                                    }
                                    setEditingReportId(null);
                                  } else if (e.key === 'Escape') {
                                    setEditingReportId(null);
                                  }
                                }}
                                className="bg-white border border-blue-500 rounded px-2.5 py-1 text-sm font-bold text-slate-900 focus:outline-none w-full shadow-sm max-w-md"
                              />
                            ) : (
                              <button type="button" onClick={() => openSavedReport(rep)} className="text-blue-600 font-bold underline cursor-default truncate max-w-md block text-left">
                                {rep.name}
                              </button>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <button 
                              onClick={() => openSavedReport(rep, true)}
                              className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 hover:text-slate-800 transition-colors inline-flex items-center justify-center cursor-default"
                              title="Download Report"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                              </svg>
                            </button>
                          </td>
                          <td className="py-3.5 px-4">{rep.client}</td>
                          <td className="py-3.5 px-4 font-semibold text-slate-800">{(rep.userId && userRows.find((u) => u.id === rep.userId)?.name) || rep.user}</td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-1 rounded font-semibold text-xs ${rep.type === 'Admin' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                              {rep.type}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-400">{rep.created}</td>
                          <td className="py-3.5 px-4 text-right relative report-menu-container">
                            <button 
                              onClick={() => setActiveMenuReportId(activeMenuReportId === rep.id ? null : rep.id)}
                              className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 hover:text-slate-800 transition-colors inline-flex items-center justify-center font-bold cursor-default"
                              title="Actions"
                            >
                              ···
                            </button>

                            {activeMenuReportId === rep.id && (
                              <div className={`absolute right-4 w-40 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-50 text-left text-xs flex flex-col ${isNearBottom ? 'bottom-12' : 'top-12'}`}>
                                <button 
                                  onClick={() => {
                                    openSavedReport(rep);
                                  }}
                                  className="px-4 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2 font-medium cursor-default"
                                >
                                  <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                  </svg>
                                  View
                                </button>
                                <button 
                                  onClick={() => {
                                    setEditingReportId(rep.id);
                                    setEditingReportNameValue(rep.name);
                                    setActiveMenuReportId(null);
                                  }}
                                  className="px-4 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2 font-medium cursor-default"
                                >
                                  <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                  </svg>
                                  Rename
                                </button>
                                <button 
                                  onClick={() => {
                                    setReportToShare(rep);
                                    setIsCopied(false);
                                    setIsShareModalOpen(true);
                                    setActiveMenuReportId(null);
                                  }}
                                  className="px-4 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2 font-medium cursor-default"
                                >
                                  <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                                  </svg>
                                  Share
                                </button>
                                <button
                                  onClick={() => {
                                    setActiveMenuReportId(null);
                                    openSavedReport(rep, true);
                                  }}
                                  className="px-4 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2 font-medium cursor-default"
                                >
                                  <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                  Download
                                </button>
                                <button 
                                  onClick={() => {
                                    setReportToDelete(rep);
                                    setIsDeleteModalOpen(true);
                                    setActiveMenuReportId(null);
                                  }}
                                  className="px-4 py-2 hover:bg-rose-50 text-rose-600 flex items-center gap-2 font-semibold border-t border-slate-100 cursor-default"
                                >
                                  <svg className="w-3.5 h-3.5 text-rose-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                  </svg>
                                  Delete
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </main>
          )}

          {/* HALAMAN DATA SOURCE */}
          {activeTab === 'datasource' && (
            isActivePropertyUser ? (
              <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto overflow-y-auto h-full pb-24 flex items-start justify-center">
                <div className="w-full bg-white border border-slate-200 rounded-2xl p-8 mt-8 text-center shadow-sm flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3" strokeLinecap="round"/></svg></div>
                  <h1 className="text-lg font-bold text-slate-900">Admin Access Required</h1>
                  <p className="text-sm text-slate-500 max-w-xl">Only property Admins can connect and manage data sources. Please contact your property Admin for access.</p>
                </div>
              </main>
            ) : (
            <main className="flex-1 p-6 md:p-8 flex flex-col gap-6 max-w-7xl w-full mx-auto overflow-y-auto h-full pb-24">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold text-slate-900">Data sources</h1>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm flex items-center gap-1.5 transition-all cursor-default">
                  <span>+</span> Connect Data Source
                </button>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                  <span className="text-sm font-bold text-slate-600">Showing {propertyDataSourcesWithIcons.length} Rows</span>
                  <input type="text" placeholder="Search" className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-blue-500 w-64" />
                </div>
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-semibold bg-slate-50/30">
                      <th className="py-3.5 px-4">Platform</th>
                      <th className="py-3.5 px-4">Page / Account</th>
                      <th className="py-3.5 px-4">Connected By</th>
                      <th className="py-3.5 px-4">Status ▼</th>
                      <th className="py-3.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                    {propertyDataSourcesWithIcons.map((ds) => (
                      <tr key={ds.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2.5">
                          {ds.svg}
                          <span className="text-blue-600 underline cursor-default">{ds.name}</span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-700">{ds.label}</td>
                        <td className="py-3.5 px-4 text-slate-700">{ds.connectedBy || 'Property Admin'}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-3 py-1 rounded-full font-semibold text-xs ${ds.status === 'Connected' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                            {ds.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right"><button type="button" className="px-2 py-1 rounded-md text-slate-500 font-bold hover:bg-slate-100" aria-label={`Actions for ${ds.name}`}>···</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </main>
            )
          )}

          {/* ACCOUNT: PROFILE */}
          {activeTab === 'profile' && <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-5xl w-full mx-auto"><div className="mb-6"><h1 className="text-2xl font-bold text-slate-900">Profile</h1><p className="text-sm text-slate-500 mt-1">Manage your personal account information.</p></div><div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-4"><div className="w-20 h-20 rounded-full bg-slate-900 text-white flex items-center justify-center text-xl font-bold overflow-hidden">{profilePhoto?<img src={profilePhoto} alt="Profile photo" className="w-full h-full object-cover"/>:'AH'}</div><div className="flex flex-col gap-1"><label className="text-sm font-semibold text-blue-600 cursor-default hover:text-blue-700 hover:font-bold">Upload photo<input type="file" accept="image/*" className="hidden" onChange={e=>{const f=e.target.files?.[0];if(f){setProfilePhoto(URL.createObjectURL(f));setProfileSaved(false);}e.target.value='';}}/></label><span className="text-xs text-slate-400">Image preview is temporary and resets when the page is refreshed.</span></div></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><label className="text-xs font-semibold text-slate-600">First Name<input value={profileFirstName} onChange={e=>{setProfileFirstName(e.target.value);setProfileSaved(false);}} className="mt-1 w-full border border-slate-200 rounded-lg p-2.5 text-sm"/></label><label className="text-xs font-semibold text-slate-600">Last Name<input value={profileLastName} onChange={e=>{setProfileLastName(e.target.value);setProfileSaved(false);}} className="mt-1 w-full border border-slate-200 rounded-lg p-2.5 text-sm"/></label><label className="text-xs font-semibold text-slate-600 md:col-span-2">Primary Email <span className="text-emerald-600">· Verified</span><input value={profileEmail} readOnly disabled aria-readonly="true" className="mt-1 w-full border border-slate-200 rounded-lg p-2.5 text-sm bg-slate-100 text-slate-500 cursor-default select-none"/></label><label className="text-xs font-semibold text-slate-600 md:col-span-2">Recovery Email<input value={recoveryEmail} onChange={e=>{setRecoveryEmail(e.target.value);setProfileSaved(false);}} placeholder="Optional recovery email" className="mt-1 w-full border border-slate-200 rounded-lg p-2.5 text-sm"/></label></div>
            <div className="border-t border-slate-100 pt-5"><h2 className="font-bold text-slate-900 mb-3">Change Password</h2><div className="grid md:grid-cols-3 gap-3">{['Current Password','New Password','Confirm New Password'].map(x=><input key={x} type="password" placeholder={x} className="border border-slate-200 rounded-lg p-2.5 text-sm"/>)}</div></div><div className="border-t border-slate-100 pt-4 flex justify-between items-center"><div><span className="text-xs text-slate-500">Account Created · 12 March 2026</span>{profileSaved&&<p className="text-xs text-emerald-600 font-semibold mt-1">Profile changes saved for this session.</p>}</div><button onClick={()=>setProfileSaved(true)} className={`px-5 py-2.5 rounded-lg font-semibold ${profileSaved?'bg-emerald-600 text-white':'bg-blue-600 text-white hover:bg-blue-700'}`}>{profileSaved?'Saved':'Save Profile'}</button></div></div></main>}

          {/* ACCOUNT: USERS */}
          {activeTab === 'users' && <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto"><div className="mb-6"><h1 className="text-2xl font-bold text-slate-900">Users</h1><p className="text-sm text-slate-500 mt-1">Manage user access for each property.</p></div><div className="bg-white border border-slate-200 rounded-2xl overflow-hidden"><div className="p-4 flex justify-between items-center"><span className="text-sm font-semibold text-slate-600">{visibleUserRows.length} users</span></div><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-slate-500"><tr>{[['property','Property'],['account','Account'],['email','Email'],['type','Type'],['status','Status']].map(([key,label])=><th key={key} className="px-4 py-3"><button onClick={()=>setUserSort(prev=>({key,direction:prev.key===key&&prev.direction==='asc'?'desc':'asc'}))}>{label} ↕</button></th>)}<th className="px-4 py-3"> </th></tr></thead><tbody className="divide-y divide-slate-100">{[...visibleUserRows].sort((a,b)=>String(a[userSort.key]).localeCompare(String(b[userSort.key]))*(userSort.direction==='asc'?1:-1)).map(row=>{const canManageUserRow=getCurrentUserRoleForProperty(row.property)==='Admin';return <tr key={row.id}><td className="px-4 py-3">{row.property}</td><td className="px-4 py-3">{row.account || (row.you ? `${profileFirstName} ${profileLastName}`.trim() : '—')}</td><td className="px-4 py-3">{row.email} {row.you&&<span className="text-slate-400">(You)</span>}</td><td className="px-4 py-3">{row.type}</td><td className="px-4 py-3"><span className={`text-xs rounded-full px-2.5 py-1 ${row.status==='Active'?'bg-emerald-50 text-emerald-700':'bg-amber-50 text-amber-700'}`}>{row.status}</span></td><td className="px-4 py-3"><div className="relative inline-block user-action-container">{(canManageUserRow||(row.you&&row.type==='Member'&&row.status==='Active'))?<><button type="button" aria-label={`Actions for ${row.email} at ${row.property}`} onClick={()=>setUserActionMenuId(current=>current===row.id?null:row.id)} className="px-2 py-1 rounded-md text-slate-500 hover:bg-slate-100">•••</button>{userActionMenuId===row.id&&<div className="absolute right-0 top-full mt-1 z-50 w-40 rounded-xl border border-slate-200 bg-white py-1 shadow-lg text-left">{(canManageUserRow?(row.status==='Active'?['Edit','Remove']:['Resend','Cancel']):['Leave']).map(action=><button key={action} type="button" onClick={()=>{if(action==='Leave'){const confirmed=window.confirm(`Leave ${row.property}? You will lose access to this workspace, and it will disappear from your property list.`);if(confirmed){const remainingProperties=[...new Set(userRows.filter(item=>item.email.toLowerCase()===currentUserEmail&&item.status==='Active'&&item.id!==row.id).map(item=>item.property))];setUserRows(current=>current.filter(item=>item.id!==row.id));if(selectedClient===row.property)setSelectedClient(remainingProperties[0]||'');}}else if(['Remove','Cancel'].includes(action)){setUserRows(current=>current.filter(item=>item.id!==row.id));}setUserActionMenuId(null);}} className={`w-full px-3 py-2 text-left text-sm hover:bg-slate-50 ${['Remove','Cancel','Leave'].includes(action)?'text-rose-600':'text-slate-700'}`}>{action}</button>)}</div>}</>:<span className="inline-flex items-center gap-1.5 text-xs text-slate-400" title="Only property Admins can manage users"><icon name="lock" size="xs"/> View only</span>}</div></td></tr>})}</tbody></table><div className="p-4 border-t border-slate-100"><button onClick={()=>setShowAddUserModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold">+ Add User</button></div></div></main>}

          {/* ACCOUNT: BILLING */}
          {activeTab === 'billing' && <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
            <div className="mb-6"><h1 className="text-2xl font-bold text-slate-900">Billing</h1><p className="text-sm text-slate-500 mt-1">Manage your subscription and payments.</p></div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><h2 className="text-base font-bold text-slate-900">Subscription Overview · {selectedBillingSubscription?.property || 'No property selected'}</h2></div>
            <div className="grid md:grid-cols-3 gap-4">
              {[{name:'Free',price:'Rp0',desc:'For getting started',features:['Limited platforms','Basic dashboard']},{name:'Pro',price:'Rp200.000',desc:'Per property / month',features:['All core platforms','Saved reports','Multiple properties']},{name:'Agency',price:'Rp300.000',desc:'Per property / month',features:['Everything in Pro','White label branding','Custom domain']}].map(plan=><div key={plan.name} className={`bg-white border rounded-2xl p-5 ${selectedBillingSubscription?.plan===plan.name?'border-blue-500 ring-2 ring-blue-100':''}`}><div className="flex justify-between"><h2 className="font-bold text-lg">{plan.name}</h2>{selectedBillingSubscription?.plan===plan.name&&<span className="text-xs text-blue-600 font-bold">Current Plan</span>}</div><p className="text-2xl font-bold mt-4">{plan.price}</p><p className="text-xs text-slate-500">{plan.desc}</p><ul className="text-sm text-slate-600 my-5 space-y-2">{plan.features.map(f=><li key={f}>✓ {f}</li>)}</ul><button disabled={!selectedBillingSubscription || getCurrentUserRoleForProperty(selectedBillingSubscription.property)!=='Admin'} onClick={()=>{if(selectedBillingSubscription&&getCurrentUserRoleForProperty(selectedBillingSubscription.property)==='Admin'){setBillingSubscriptions(rows=>rows.map(row=>row.id===selectedBillingSubscription.id?{...row,plan,status:'Active',statusNote:''}:row));setBillingPlan(plan.name);}}} className="w-full border border-slate-200 rounded-lg py-2 text-sm font-semibold hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed">{selectedBillingSubscription?.plan===plan.name?'Current Plan':'Select Plan'}</button></div>)}
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white border border-slate-200 rounded-xl p-5"><h3 className="font-bold text-slate-900">Property Usage</h3><p className="text-sm text-slate-500 mt-3">{clientList.length} properties</p></div>
              <div className="bg-white border border-slate-200 rounded-xl p-5"><h3 className="font-bold text-slate-900">Payment Method · {selectedBillingSubscription?.property || '—'}</h3><p className="text-sm text-slate-500 mt-3">{selectedBillingSubscription?.paymentMethod || 'No payment method added'}</p></div>
              <div className="bg-white border border-slate-200 rounded-xl p-5"><h3 className="font-bold text-slate-900">Billing History · {selectedBillingSubscription?.property || '—'}</h3><p className="text-sm text-slate-500 mt-3">{selectedBillingSubscription?.billingHistory || 'No billing history yet'}</p></div>
            </div>
            <section className="mt-6 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-visible">
              <div className="px-4 py-4 border-b border-slate-100 flex items-center justify-between"><div><h2 className="font-bold text-slate-900">Property Subscriptions</h2><p className="text-xs text-slate-500 mt-1">Manage each property's plan and renewal settings.</p></div></div>
              <div className="overflow-visible"><table className="w-full min-w-[850px] text-left text-sm">
                <thead className="text-slate-400"><tr className="border-b border-slate-200">{[['property','Property'],['plan','Subscription'],['paymentMethod','Payment Method'],['expiresOn','Expired'],['autoRenewal','Auto Renewal'],['status','Status']].map(([key,label])=><th key={key} className="px-4 py-3 font-semibold whitespace-nowrap"><button type="button" onClick={()=>setBillingSort(prev=>({key,direction:prev.key===key&&prev.direction==='asc'?'desc':'asc'}))} className="inline-flex items-center gap-1 hover:text-slate-700">{label}<span aria-hidden="true">{billingSort.key===key?(billingSort.direction==='asc'?'↑':'↓'):'↕'}</span></button></th>)}<th className="px-4 py-3 font-semibold whitespace-nowrap">Action</th></tr></thead>
                <tbody className="divide-y divide-slate-100">{[...billingSubscriptions].sort((a,b)=>{const av=a[billingSort.key]??'';const bv=b[billingSort.key]??'';const cmp=typeof av==='boolean'?(av===bv?0:av?1:-1):String(av).localeCompare(String(bv),undefined,{numeric:true,sensitivity:'base'});return cmp*(billingSort.direction==='asc'?1:-1);}).map(subscription=>{const canManageSubscription=getCurrentUserRoleForProperty(subscription.property)==='Admin';return <tr key={subscription.id} className={`hover:bg-slate-50/70 ${selectedBillingProperty===subscription.property?'bg-blue-50/30':''}`}>
                  <td className="px-4 py-4 font-medium">{canManageSubscription?<button type="button" onClick={()=>{setSelectedBillingProperty(subscription.property);setBillingPlan(subscription.plan);setBillingActionMenu(null);}} className={`text-left hover:text-blue-700 hover:underline ${selectedBillingProperty===subscription.property?'text-blue-700':'text-slate-900'}`}>{subscription.property}</button>:<span className="text-slate-900 cursor-default">{subscription.property}</span>}</td>
                  {!canManageSubscription ? <td colSpan={6} className="px-4 py-4"><div className="flex items-center gap-2 text-sm text-slate-600"><span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3"/></svg></span><span><strong className="font-semibold text-slate-800">Admin Access Required</strong><span className="text-slate-500"> · Only property Admins can manage subscriptions. Contact your property Admin for assistance.</span></span></div></td> : <>
                    <td className="px-4 py-4 text-slate-700">{subscription.plan}</td>
                    <td className="px-4 py-4 text-slate-600">{subscription.paymentMethod}</td>
                    <td className="px-4 py-4 text-slate-600">{subscription.expiresOn ? new Date(`${subscription.expiresOn}T12:00:00`).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}) : '—'}</td>
                    <td className="px-4 py-4"><button type="button" aria-label={`Toggle auto renewal for ${subscription.property}`} onClick={()=>setBillingSubscriptions(rows=>rows.map(row=>row.id===subscription.id?{...row,autoRenewal:!row.autoRenewal}:row))} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${subscription.autoRenewal?'bg-blue-600':'bg-slate-300'}`}><span className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${subscription.autoRenewal?'translate-x-4':'translate-x-1'}`}/></button><span className="ml-2 text-xs text-slate-500">{subscription.autoRenewal?'On':'Off'}</span></td>
                    <td className="px-4 py-4"><span className={`inline-flex rounded-md px-2.5 py-1 text-xs ${subscription.status==='Active'?'bg-emerald-50 text-emerald-700':subscription.status.includes('Trial')||subscription.status.includes('Days Left')?'bg-amber-50 text-amber-700':'bg-rose-50 text-rose-600'}`}>{subscription.status}</span>{subscription.statusNote&&<p className="mt-1 max-w-[190px] text-[11px] leading-4 text-slate-500">{subscription.statusNote}</p>}</td>
                    <td className="px-4 py-4 text-right relative billing-action-container"><button type="button" aria-label={`Actions for ${subscription.property}`} onClick={()=>setBillingActionMenu(current=>current===subscription.id?null:subscription.id)} className="px-2 py-1 rounded-md text-slate-500 hover:bg-slate-100">•••</button>
                      {billingActionMenu===subscription.id&&<div className="absolute right-0 top-full mt-1 z-50 w-52 rounded-xl border border-slate-200 bg-white py-1 shadow-lg text-left"><button onClick={()=>openBillingEdit(subscription)} className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">Edit Subscription</button><button onClick={()=>{setExtendingBillingSubscription(subscription);setBillingExtensionDuration('30 days');setBillingActionMenu(null);}} className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">Extend Subscription</button><button onClick={()=>{setBillingSubscriptions(rows=>rows.map(row=>row.id===subscription.id?{...row,autoRenewal:!row.autoRenewal}:row));setBillingActionMenu(null);}} className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">{subscription.autoRenewal?'Disable':'Enable'} Auto Renewal</button><button onClick={()=>{if(window.confirm(`Cancel subscription for ${subscription.property}? The property will remain in your workspace.`)){setBillingSubscriptions(rows=>rows.map(row=>row.id===subscription.id?{...row,status:'Cancelled',statusNote:'Subscription cancelled.',autoRenewal:false}:row));}setBillingActionMenu(null);}} className="w-full px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50">Cancel Subscription</button><button onClick={()=>{if(window.confirm(`Delete ${subscription.property} from this workspace? This cannot be undone.`)){setBillingSubscriptions(rows=>rows.filter(row=>row.id!==subscription.id));setClientList(rows=>rows.filter(name=>name!==subscription.property));if(selectedBillingProperty===subscription.property)setSelectedBillingProperty('');}setBillingActionMenu(null);}} className="w-full px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50">Delete Property</button></div>}
                    </td>
                  </>}
                </tr>})}</tbody>
              </table></div>
              {billingSubscriptions.length===0&&<div className="px-4 py-8 text-center text-sm text-slate-400">No property subscriptions.</div>}
            </section>
            {editingBillingSubscription&&<div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/40 p-4"><div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"><h3 className="text-lg font-bold text-slate-900">Edit Subscription</h3><p className="mt-1 text-sm text-slate-500">{editingBillingSubscription.property}</p><div className="mt-5 space-y-4"><label className="block text-sm font-medium text-slate-700">Subscription<select value={billingEditForm.plan} onChange={e=>setBillingEditForm(form=>({...form,plan:e.target.value}))} className="mt-1 w-full rounded-lg border border-slate-200 p-2.5"><option>Free</option><option>Pro</option><option>Agency</option></select></label><label className="block text-sm font-medium text-slate-700">Payment Method<input value={billingEditForm.paymentMethod} onChange={e=>setBillingEditForm(form=>({...form,paymentMethod:e.target.value}))} placeholder="e.g. Bank Transfer, Credit Card" className="mt-1 w-full rounded-lg border border-slate-200 p-2.5"/></label><label className="block text-sm font-medium text-slate-700">Expired<input type="date" value={billingEditForm.expiresOn} onChange={e=>setBillingEditForm(form=>({...form,expiresOn:e.target.value}))} className="mt-1 w-full rounded-lg border border-slate-200 p-2.5"/></label><label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" checked={billingEditForm.autoRenewal} onChange={e=>setBillingEditForm(form=>({...form,autoRenewal:e.target.checked}))}/> Auto Renewal</label></div><div className="mt-6 flex justify-end gap-2"><button onClick={()=>setEditingBillingSubscription(null)} className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Cancel</button><button onClick={saveBillingEdit} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Save Changes</button></div></div></div>}
            {extendingBillingSubscription&&<div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/40 p-4"><div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"><h3 className="text-lg font-bold text-slate-900">Extend Subscription</h3><p className="mt-1 text-sm text-slate-500">{extendingBillingSubscription.property}</p><div className="mt-5 space-y-3"><label className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 ${billingExtensionDuration==='30 days'?'border-blue-500 bg-blue-50':'border-slate-200'}`}><span className="text-sm font-medium text-slate-700">30 Days</span><input type="radio" name="billing-extension" checked={billingExtensionDuration==='30 days'} onChange={()=>setBillingExtensionDuration('30 days')}/></label><label className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 ${billingExtensionDuration==='1 year'?'border-blue-500 bg-blue-50':'border-slate-200'}`}><span className="text-sm font-medium text-slate-700">1 Year</span><input type="radio" name="billing-extension" checked={billingExtensionDuration==='1 year'} onChange={()=>setBillingExtensionDuration('1 year')}/></label></div><div className="mt-6 flex justify-end gap-2"><button onClick={()=>setExtendingBillingSubscription(null)} className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Cancel</button><button onClick={()=>extendBillingSubscription(extendingBillingSubscription,billingExtensionDuration)} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Confirm Extension</button></div></div></div>}
          </main>}

          {/* ACCOUNT: SETTINGS */}
          {activeTab === 'settings' && <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-4xl w-full mx-auto"><div className="mb-6"><h1 className="text-2xl font-bold text-slate-900">Settings</h1><p className="text-sm text-slate-500 mt-1">Manage account and workspace preferences.</p></div><div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100"> <div className="p-5 flex justify-between items-center"><div><h3 className="font-bold">Appearance</h3><p className="text-xs text-slate-500 mt-1">Choose your dashboard theme.</p></div><select value={appearance} onChange={e=>setAppearance(e.target.value)} className="border border-slate-200 rounded-lg p-2 text-sm"><option>Light Mode</option><option>Dark Mode</option></select></div><div className="p-5 flex justify-between items-center"><div><h3 className="font-bold">White Label Branding</h3><p className="text-xs text-slate-500 mt-1">Available on Agency plan.</p></div><button disabled={billingPlan!=='Agency'} className="px-4 py-2 rounded-lg text-sm font-semibold bg-slate-100 text-slate-400 disabled:cursor-default">Configure Branding</button></div><div className="p-5 flex justify-between items-center"><div><h3 className="font-bold">Custom Domain</h3><p className="text-xs text-slate-500 mt-1">Available on Agency plan.</p></div><button disabled={billingPlan!=='Agency'} className="px-4 py-2 rounded-lg text-sm font-semibold bg-slate-100 text-slate-400 disabled:cursor-default">Configure Domain</button></div><div className="p-5 flex justify-between items-center"><div><h3 className="font-bold">Delete Account</h3><p className="text-xs text-slate-500 mt-1">Permanently delete your account.</p></div><button onClick={()=>setShowDeleteAccountConfirm(true)} className="px-4 py-2 rounded-lg border border-rose-200 text-rose-600 text-sm font-semibold">Delete Account</button></div></div></main>}

          {showAddUserModal && <div className="fixed inset-0 bg-slate-900/40 z-[70] flex items-center justify-center p-4"><div className="bg-white rounded-2xl p-6 w-full max-w-md"><h3 className="font-bold text-lg mb-4">Add User</h3><label className="block text-xs font-semibold mb-3">Property<select id="invite-property" className="mt-1 w-full border rounded-lg p-2.5">{clientList.filter(c=>getCurrentUserRoleForProperty(c)==='Admin').map(c=><option key={c}>{c}</option>)}</select></label><label className="block text-xs font-semibold mb-3">Email<input id="invite-email" type="email" placeholder="name@example.com" className="mt-1 w-full border rounded-lg p-2.5"/></label><label className="block text-xs font-semibold mb-4">Type<select id="invite-type" className="mt-1 w-full border rounded-lg p-2.5"><option>Member</option><option>Admin</option></select></label><div className="flex justify-end gap-2"><button onClick={()=>setShowAddUserModal(false)} className="px-4 py-2 rounded-lg bg-slate-100">Cancel</button><button onClick={()=>{const email=document.getElementById('invite-email')?.value;const prop=document.getElementById('invite-property')?.value;const type=document.getElementById('invite-type')?.value;if(email&&prop){setUserRows(rows=>[...rows,{id:'u'+Date.now(),property:prop,email,type,status:'Pending'}]);setShowAddUserModal(false);}}} className="px-4 py-2 rounded-lg bg-blue-600 text-white">Send Invitation</button></div></div></div>}
          {showLogoutConfirm && <div className="fixed inset-0 bg-slate-900/40 z-[70] flex items-center justify-center p-4"><div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center"><h3 className="font-bold text-lg">Log out?</h3><p className="text-sm text-slate-500 my-3">Are you sure you want to log out?</p><div className="flex gap-2"><button onClick={()=>setShowLogoutConfirm(false)} className="flex-1 py-2 rounded-lg bg-slate-100">Cancel</button><button onClick={()=>{setShowLogoutConfirm(false);setActiveTab('dashboard');}} className="flex-1 py-2 rounded-lg bg-rose-600 text-white">Logout</button></div></div></div>}
          {showDeleteAccountConfirm && <div className="fixed inset-0 bg-slate-900/40 z-[70] flex items-center justify-center p-4"><div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center"><h3 className="font-bold text-lg">Delete Account?</h3><p className="text-sm text-slate-500 my-3">This is a prototype confirmation. Property data and saved reports are not deleted here.</p><div className="flex gap-2"><button onClick={()=>setShowDeleteAccountConfirm(false)} className="flex-1 py-2 rounded-lg bg-slate-100">Cancel</button><button onClick={()=>setShowDeleteAccountConfirm(false)} className="flex-1 py-2 rounded-lg bg-rose-600 text-white">Confirm Delete</button></div></div></div>}

          {/* CUSTOMIZE METRIC */}
          {activeTab === 'dashboard' && !viewingSavedReport && !isActivePropertyUser && (
            <aside className="relative w-80 bg-white border-l border-slate-200 p-4 flex flex-col gap-3 shrink-0 shadow-sm h-full overflow-hidden">
              <div className={`absolute inset-0 p-4 flex flex-col gap-3 transition-transform duration-300 ease-out ${selectedMetricPlatform ? '-translate-x-full' : 'translate-x-0'}`}>
                <span className="font-bold text-slate-900 uppercase tracking-wide mb-1 text-xs">CUSTOMIZE METRIC</span>
                <input type="text" value={metricSearch} onChange={(e) => setMetricSearch(e.target.value)} placeholder="Search platform..." className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-blue-500" />
                <div className="flex flex-col gap-0.5 overflow-y-auto pr-1">
                  {orderedPropertyIntegrations.filter((item) => item.name.toLowerCase().includes(metricSearch.toLowerCase())).map((item) => (
                    <button key={item.id} type="button" disabled={!item.connected} onClick={() => { if (!item.connected) return; setSelectedMetricPlatform(item); setMetricSearch(''); setSelectedMetricSearch(''); }} className={`flex items-center justify-between py-2 px-3 rounded-lg transition-colors border border-transparent text-left w-full min-h-[52px] ${item.connected ? 'hover:bg-slate-50 hover:border-slate-200 group cursor-pointer' : 'bg-slate-50/70 cursor-not-allowed'}`}>
                      <span className="flex items-center gap-3 min-w-0"><span className={`w-5 h-5 flex items-center justify-center shrink-0 ${item.connected ? '' : 'opacity-40 grayscale'}`}>{item.svg}</span><span className="min-w-0 flex flex-col justify-center"><span className={`font-medium text-sm truncate ${item.connected ? 'text-slate-800' : 'text-slate-400'}`}>{(item.label || item.name)}</span>{!item.connected && <span className="text-[10px] leading-3 text-slate-400 mt-0.5">Account integration required</span>}</span></span>
                      <span className={`font-bold text-base ${item.connected ? 'text-slate-400 group-hover:text-slate-600' : 'text-slate-300'}`}>›</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className={`absolute inset-0 p-4 flex flex-col gap-3 transition-transform duration-300 ease-out ${selectedMetricPlatform ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <button type="button" onClick={() => { setSelectedMetricPlatform(null); setSelectedMetricSearch(''); }} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600" aria-label="Back to platforms"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 12h12" strokeLinecap="round"/></svg></button>
                  <span className="font-bold text-sm text-slate-900 truncate">{(selectedMetricPlatform?.label || selectedMetricPlatform?.name)} Metrics</span>
                </div>
                <p className="text-[11px] text-slate-400">Drag a metric into the dashboard</p>
                <div className="relative shrink-0">
                  <svg aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4" strokeLinecap="round"/></svg>
                  <input type="text" value={selectedMetricSearch} onChange={(e) => setSelectedMetricSearch(e.target.value)} placeholder="Search metrics..." aria-label={`Search ${selectedMetricPlatform?.name} metrics`} className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-blue-500" />
                </div>
                <div className="flex flex-col gap-2 overflow-y-auto pr-1 pb-4">
                  {Object.keys(metricCatalog[getMetricCatalogPlatform(selectedMetricPlatform?.name)] || {}).filter((name) => name.toLowerCase().includes(selectedMetricSearch.toLowerCase())).map((name) => (
                    <div key={name} draggable onClick={() => addDashboardMetric(selectedMetricPlatform.name, name)} onDragStart={(e) => { const payload = { platform: selectedMetricPlatform.name, name }; draggedNewMetricRef.current = payload; e.dataTransfer.setData('application/getone-metric', JSON.stringify(payload)); e.dataTransfer.setData('text/plain', JSON.stringify(payload)); e.dataTransfer.effectAllowed = 'copy'; setMetricDragPreview(null); }} onDragEnd={() => { draggedNewMetricRef.current = null; setMetricDragPreview(null); }} className="flex items-center justify-start gap-3 border border-slate-200 rounded-xl px-3 py-3 bg-white hover:border-blue-300 hover:bg-blue-50/40 transition-colors cursor-default active:cursor-default select-none">
                      <button type="button" aria-label={`Drag ${name} metric`} onClick={(e) => e.stopPropagation()} className="w-3.5 h-4 shrink-0 flex items-center justify-center cursor-default active:cursor-default touch-none" title="Drag metric to report">
                        <svg aria-hidden="true" className="w-3.5 h-4 text-slate-400" viewBox="0 0 12 16" fill="currentColor"><circle cx="2" cy="3" r="1.05"/><circle cx="6" cy="3" r="1.05"/><circle cx="10" cy="3" r="1.05"/><circle cx="2" cy="8" r="1.05"/><circle cx="6" cy="8" r="1.05"/><circle cx="10" cy="8" r="1.05"/><circle cx="2" cy="13" r="1.05"/><circle cx="6" cy="13" r="1.05"/><circle cx="10" cy="13" r="1.05"/></svg>
                      </button><span className="text-sm font-medium text-slate-700">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          )}

          {metricPendingDelete && (
            <div className="fixed inset-0 z-[70] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl border border-slate-200 p-5 flex flex-col gap-4">
                <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                <div><h3 className="font-bold text-slate-900">Delete metric?</h3><p className="text-sm text-slate-500 mt-1">Are you sure you want to delete “{metricPendingDelete.name}” from this dashboard?</p></div>
                <div className="flex justify-end gap-2"><button type="button" onClick={() => setMetricPendingDelete(null)} className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100">Cancel</button><button type="button" onClick={() => { setDashboardMetrics((curr) => curr.filter((m) => m.id !== metricPendingDelete.id)); setMetricPendingDelete(null); }} className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-600 text-white hover:bg-red-700">Delete</button></div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* MODAL SAVE REPORT */}
      {isSavedModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl border border-slate-200 flex flex-col gap-4 text-sm">
            <h3 className="text-base font-bold text-slate-900">Save Current Dashboard as Report</h3>
            
            <p className="text-xs text-slate-500 leading-relaxed">
              This will capture the current widget layout and active date range into your Reports list:<br />
              <strong className="text-slate-800 font-bold">{dateRange}</strong>
            </p>
            
            <div className="flex flex-col gap-1.5 mt-2">
              <label className="text-xs font-bold text-slate-700">Report Title</label>
              <input 
                type="text" 
                value={reportName} 
                onChange={(e) => setReportName(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-blue-500 font-medium"
              />
            </div>

            <div className="flex flex-col gap-1.5 mt-1">
              <label className="text-xs font-bold text-slate-700">Save option</label>
              <select value={saveTargetReportId} onChange={(e) => { setSaveTargetReportId(e.target.value); if (e.target.value) { const target = reportList.find((report) => report.id === e.target.value); if (target) setReportName(target.name); } }} className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-blue-500 font-medium">
                <option value="">Save as a new report</option>
                {reportList.map((report) => <option key={report.id} value={report.id}>Overwrite: {report.name}</option>)}
              </select>
              <p className="text-[11px] text-slate-400">Choose an existing report to replace its saved snapshot, or save a separate copy.</p>
            </div>

            <div className="flex justify-end gap-2.5 mt-4 pt-3 border-t border-slate-100">
              <button onClick={() => setIsSavedModalOpen(false)} className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-default">Cancel</button>
              <button onClick={handleSaveReport} className="px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm cursor-default">Confirm & Save</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ADD PROPERTY KUSTOM */}
      {isAddClientModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 flex flex-col gap-4 text-sm animate-in fade-in zoom-in duration-200">
            <h3 className="text-base font-bold text-slate-900">Add New Property</h3>
            <p className="text-xs text-slate-500">Enter the name of the new property to add to your list.</p>
            
            <form onSubmit={handleConfirmAddClient} className="flex flex-col gap-4">
              <input 
                type="text" 
                autoFocus
                placeholder="e.g. Wonderland Bali" 
                value={newClientInputValue}
                onChange={(e) => setNewClientInputValue(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-500 font-medium"
              />

              <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setIsAddClientModalOpen(false)} 
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-all cursor-default"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all cursor-default"
                >
                  Add Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {propertyAction && <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4"><div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 flex flex-col gap-4 text-sm">
        <h3 className="text-base font-bold text-slate-900">{propertyAction.type === 'rename' ? 'Rename Property' : 'Delete Property?'}</h3>
        {propertyAction.type === 'rename' ? <input value={propertyNameInput} onChange={e=>setPropertyNameInput(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5" autoFocus /> : <p className="text-xs text-slate-500">Are you sure you want to delete <strong>{propertyAction.name}</strong>? This demo action only removes it from this local prototype.</p>}
        <div className="flex justify-end gap-2"><button onClick={()=>setPropertyAction(null)} className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700">Cancel</button><button onClick={()=>{ if(propertyAction.type==='rename' && propertyNameInput.trim()){const old=propertyAction.name, next=propertyNameInput.trim();if(next!==old){setClientList(list=>list.map(x=>x===old?next:x));setUserRows(rows=>rows.map(row=>row.property===old?{...row,property:next}:row));if(selectedClient===old)setSelectedClient(next);setActivePropertyMenu(null);setPropertyLogo(prev=>{const copy={...prev};if(copy[old]){copy[next]=copy[old];delete copy[old];}return copy;});}} else if(propertyAction.type==='delete'){if(clientList.length>1){setClientList(list=>list.filter(x=>x!==propertyAction.name));if(selectedClient===propertyAction.name)setSelectedClient(clientList.find(x=>x!==propertyAction.name));} } setPropertyAction(null);}} className={`px-4 py-2 rounded-lg text-white ${propertyAction.type==='delete'?'bg-rose-600':'bg-blue-600'}`}>{propertyAction.type==='rename'?'Save':'Delete Property'}</button></div>
      </div></div>}

      {/* MODAL SHARE REPORT KUSTOM */}
      {isShareModalOpen && reportToShare && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 flex flex-col gap-4 text-sm animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-slate-900">Share Report Link</h3>
              <button 
                onClick={() => setIsShareModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-base font-bold px-2 py-1 cursor-default"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Anyone with this link can view the analytics report for <strong className="text-slate-800">"{reportToShare.name}"</strong>.
            </p>

            <div className="flex items-center gap-2 mt-1">
              <input 
                type="text" 
                readOnly 
                value={`https://goa.com/reports/${reportToShare.id}`} 
                className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-600 font-mono flex-1 select-all"
              />
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(`https://goa.com/reports/${reportToShare.id}`);
                  setIsCopied(true);
                  setTimeout(() => setIsCopied(false), 2000);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm cursor-default ${isCopied ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                title="Copy Link"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                </svg>
                {isCopied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button 
                onClick={() => setIsShareModalOpen(false)} 
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-default"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DELETE REPORT KUSTOM */}
      {isDeleteModalOpen && reportToDelete && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 flex flex-col items-center text-center gap-4 text-sm animate-in fade-in zoom-in duration-200">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center text-xl shadow-inner font-bold">
              !
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-bold text-slate-900">Delete Report?</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Are you sure you want to delete report <strong className="text-slate-800">"{reportToDelete.name}"</strong>? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-2.5 w-full mt-2">
              <button 
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setReportToDelete(null);
                }} 
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-xs transition-all cursor-default"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDeleteReport} 
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2.5 rounded-xl text-xs shadow-sm transition-all cursor-default"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DELETE PAGE KUSTOM (PANEL KIRI DASHBOARD) */}
      {isDeletePageModalOpen && pageToDelete && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 flex flex-col items-center text-center gap-4 text-sm animate-in fade-in zoom-in duration-200">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center text-xl shadow-inner font-bold">
              !
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-bold text-slate-900">Delete Page?</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Are you sure you want to delete page <strong className="text-slate-800">"{pageToDelete.title}"</strong>? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-2.5 w-full mt-2">
              <button 
                onClick={() => {
                  setIsDeletePageModalOpen(false);
                  setPageToDelete(null);
                }} 
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-xs transition-all cursor-default"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDeletePage} 
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2.5 rounded-xl text-xs shadow-sm transition-all cursor-default"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL SUKSES CUSTOM */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 flex flex-col items-center text-center gap-4 text-sm animate-in fade-in zoom-in duration-200">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-2xl shadow-inner">
              ✓
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-bold text-slate-900">Report Saved Successfully!</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Report <strong className="text-slate-800">"{latestSavedReportName}"</strong> has been successfully saved to your Reports list.
              </p>
            </div>

            <div className="flex gap-2.5 w-full mt-2">
              <button 
                onClick={() => setIsSuccessModalOpen(false)} 
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-xs transition-all cursor-default"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  setActiveTab('reports');
                }} 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-xs shadow-sm transition-all cursor-default"
              >
                Go to Reports
              </button>
            </div>
          </div>
        </div>
      )}

      {tableColumnDrag?.moved && (
        <div aria-hidden="true" className="pointer-events-none fixed z-[9999] rounded-md border-2 border-blue-500 bg-white px-2 py-1 text-[14px] font-semibold text-blue-700 shadow-2xl" style={{ left: tableColumnDrag.pointerX - tableColumnDrag.offsetX, top: tableColumnDrag.top + 2, minWidth: `${Math.max(48, tableColumnDrag.width)}px`, opacity: 0.97 }}>{tableColumnDrag.label}</div>
      )}

    </div>
  );
}