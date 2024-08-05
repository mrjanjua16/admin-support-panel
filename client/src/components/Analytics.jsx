import { useState } from 'react'
import SupportAnalytics from './SupportAnalytics.jsx'
import ImplementationAnalytics from './ImplementationAnalytics.jsx'

export default function Analytics() {
  const [selectedTab, setSelectedTab] = useState('Support')
  return (
    <div>
      <div className='flex flex-row gap-4'>
        <div onClick={() => setSelectedTab('Support')}>Support</div>
        <div onClick={() => setSelectedTab('Implementation')}>Implementation</div>
      </div>
      <hr />
      {selectedTab === 'Support' ? <SupportAnalytics /> : <ImplementationAnalytics />}
    </div>
  )
}
