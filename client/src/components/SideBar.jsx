import { Sidebar } from "flowbite-react";
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

export default function SideBar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [tab, setTab] = useState('');
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const UrlParams = new URLSearchParams(location.search);
    const tabFromUrl = UrlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <Sidebar className='w-64 h-full'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          <Link to='/Dashboard?tab=Analytics'>
            <Sidebar.Item active={tab === 'Analytics'} labelColor='dark' as='div'>
              Analytics
            </Sidebar.Item>
          </Link>
          <Link to='/Dashboard?tab=Tasks'>
            <Sidebar.Item active={tab === 'Tasks'} labelColor='dark' as='div'>
              Tasks
            </Sidebar.Item>
          </Link>
          <Link to='/Dashboard?tab=Clients'>
            <Sidebar.Item active={tab === 'Clients'} labelColor='dark' as='div'>
              Clients
            </Sidebar.Item>
          </Link>
          <Link to='/Dashboard?tab=Users'>
            <Sidebar.Item active={tab === 'Users'} labelColor='dark' as='div'>
              Users
            </Sidebar.Item>
          </Link>
          <Link to='/Dashboard?tab=Inbox'>
            <Sidebar.Item active={tab === 'Inbox'} labelColor='dark' as='div'>
              Inbox
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
