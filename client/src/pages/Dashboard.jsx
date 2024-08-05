import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Analytics from '../components/Analytics';
import Tasks from '../components/Tasks';

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const UrlParams = new URLSearchParams(location.search);
    const tabFromUrl = UrlParams.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 pt-16">
        <SideBar />
        <div className="flex-1 p-4">
          {tab === 'Analytics' && <Analytics />}
          {tab === 'Tasks' && <Tasks />}
          {/* Add other components based on the tab value */}
        </div>
      </div>
    </div>
  );
}
