import React, { useState } from 'react';
import { Search, Calendar, MessageSquare, User, CheckCircle, AlertCircle, Send, FileText, Users, ChevronDown, Bell, Mail, Edit2, Save, Lock, Plus, Trash2 } from 'lucide-react';

const NeptuneSAPDemo = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedInstaller, setSelectedInstaller] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [showInstallerDropdown, setShowInstallerDropdown] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [ticketRaised, setTicketRaised] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [phoneNumbers, setPhoneNumbers] = useState({ main: '416-555-0123', alt: '416-555-0199', msg: '416-555-0156' });
  const [editingPhone, setEditingPhone] = useState({ main: false, alt: false, msg: false });
  const [accountTasks, setAccountTasks] = useState([]);
  const [showTaskMenu, setShowTaskMenu] = useState(false);

  const mockCustomer = {
    floc: 'FL-2024-8891',
    name: 'Sarah Johnson',
    address: '142 Maple Street, Toronto, ON M5V 2K3',
    referenceNum: 'REF-89234',
    installer: { name: 'John Smith', code: 'JS-001', ward: 'Toronto Central' }
  };

  const installers = [
    {
      name: 'John Smith',
      code: 'JS-001',
      ward: 'Toronto Central',
      worksSunday: false,
      schedule: {
        Mon: { morning: 'available', afternoon: 'available', evening: 'full' },
        Tue: { morning: 'available', afternoon: 'full', evening: 'available' },
        Wed: { morning: 'full', afternoon: 'available', evening: 'available' },
        Thu: { morning: 'available', afternoon: 'full', evening: 'full' },
        Fri: { morning: 'full', afternoon: 'available', evening: 'full' },
        Sat: { morning: 'available', afternoon: 'full' }
      }
    },
    {
      name: 'Mike Davis',
      code: 'MD-002',
      ward: 'Toronto Central',
      worksSunday: false,
      schedule: {
        Mon: { morning: 'full', afternoon: 'full', evening: 'full' },
        Tue: { morning: 'full', afternoon: 'full', evening: 'full' },
        Wed: { morning: 'full', afternoon: 'full', evening: 'full' },
        Thu: { morning: 'full', afternoon: 'full', evening: 'full' },
        Fri: { morning: 'full', afternoon: 'full', evening: 'full' },
        Sat: { morning: 'full', afternoon: 'full' }
      }
    },
    {
      name: 'Lisa Chen',
      code: 'LC-003',
      ward: 'Toronto Central',
      worksSunday: true,
      schedule: {
        Mon: { morning: 'available', afternoon: 'full', evening: 'available' },
        Tue: { morning: 'full', afternoon: 'available', evening: 'available' },
        Wed: { morning: 'available', afternoon: 'available', evening: 'full' },
        Thu: { morning: 'full', afternoon: 'available', evening: 'available' },
        Fri: { morning: 'available', afternoon: 'full', evening: 'available' },
        Sat: { morning: 'available', afternoon: 'available' },
        Sun: { morning: 'available', afternoon: 'full' }
      }
    }
  ];

  const taskOptions = ['Sold Property', 'Vacant Land', 'Homeowner Refused Installation', 'Plumbing Needed', 'House Under Renovation'];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSelectedCustomer(mockCustomer);
      setSelectedInstaller(installers[0]);
      setClickCount(1);
    }
  };

  const handleSlotSelect = (day, period) => {
    if (accountTasks.length > 0) {
      alert('Cannot book - Account has active holds');
      return;
    }
    setSelectedSlot({ day, period });
    setClickCount(2);
  };

  const handleBookAppointment = () => {
    setBookingComplete(true);
    setClickCount(3);
  };

  const handleRaiseTicket = () => {
    setTicketRaised(true);
    setTimeout(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { sender: 'You', message: chatInput, time: new Date().toLocaleTimeString() }]);
      setChatInput('');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
      setTimeout(() => {
        setChatMessages(prev => [...prev, { sender: 'Supervisor - Mike R.', message: 'Got it. I can assist with that customer.', time: new Date().toLocaleTimeString() }]);
      }, 2000);
    }
  };

  const isScheduleFull = (installer) => {
    return Object.values(installer.schedule).every(day => 
      Object.values(day).every(slot => slot === 'full')
    );
  };

  const getTimeLabel = (day, period) => {
    const isWeekend = day === 'Sat' || day === 'Sun';
    if (isWeekend) {
      return period === 'morning' ? '9AM-1PM' : '1PM-6PM';
    }
    if (period === 'morning') return '8AM-12PM';
    if (period === 'afternoon') return '12PM-4PM';
    if (period === 'evening') return '4PM-8PM';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showNotification && (
        <div className="fixed top-20 right-6 w-96 bg-white rounded-lg shadow-2xl border-2 border-blue-500 z-50 animate-bounce">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg flex items-center gap-2">
            <Bell size={18} />
            <span className="font-semibold">New Message from Field</span>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-700 mb-2"><strong>Supervisor Mike R.</strong> has responded</p>
            <p className="text-xs text-gray-500">Click chat icon to view</p>
          </div>
        </div>
      )}

      <div className="bg-blue-600 text-white px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Neptune Technology Group</h1>
            <p className="text-blue-100 text-sm">Optimized Appointment Booking</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 px-4 py-2 rounded-lg">
              <span className="text-sm font-semibold">Clicks: {clickCount}/5</span>
            </div>
            <button onClick={() => setShowChat(!showChat)} className="bg-blue-500 hover:bg-blue-400 p-2 rounded-lg transition relative">
              <MessageSquare size={20} />
              {chatMessages.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">{chatMessages.length}</span>}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {!bookingComplete ? (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Universal Search</label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSearch()} placeholder="142 Maple, FL-2024-8891, 416-555-0123..." className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" />
                </div>
                <button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition">Search</button>
              </div>
            </div>

            {selectedCustomer && (
              <>
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2"><Lock size={20} className="text-orange-600" />Account Tasks & Holds</h2>
                    <div className="relative">
                      <button onClick={() => setShowTaskMenu(!showTaskMenu)} className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2">
                        <Plus size={18} />Add Task/Hold
                      </button>
                      {showTaskMenu && (
                        <div className="absolute top-full mt-2 right-0 w-72 bg-white rounded-lg shadow-xl border-2 border-gray-200 z-10">
                          <div className="p-2">
                            {taskOptions.map((task, idx) => (
                              <button key={idx} onClick={() => { setAccountTasks([...accountTasks, { task, addedBy: 'Agent', addedOn: new Date().toLocaleDateString() }]); setShowTaskMenu(false); }} className="w-full text-left px-4 py-2 rounded hover:bg-orange-50 text-sm">{task}</button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {accountTasks.length === 0 ? (
                    <p className="text-green-600 text-sm flex items-center gap-2"><CheckCircle size={16} />No active holds - Account clear for booking</p>
                  ) : (
                    <div className="space-y-2">
                      {accountTasks.map((task, idx) => (
                        <div key={idx} className="bg-orange-50 border-2 border-orange-300 rounded-lg p-3 flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-orange-900">{task.task}</p>
                            <p className="text-xs text-orange-700">Added by {task.addedBy} on {task.addedOn}</p>
                          </div>
                          <button onClick={() => setAccountTasks(accountTasks.filter((_, i) => i !== idx))} className="text-red-600 hover:text-red-800 p-2"><Trash2 size={18} /></button>
                        </div>
                      ))}
                      <p className="text-red-600 text-sm font-semibold flex items-center gap-2 mt-2"><AlertCircle size={16} />Booking blocked until tasks resolved</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><User size={20} className="text-blue-600" />Customer Info</h2>
                    <div className="space-y-3">
                      <div><p className="text-sm font-semibold text-gray-600">Name</p><p className="text-gray-900">{selectedCustomer.name}</p></div>
                      <div><p className="text-sm font-semibold text-gray-600">FLOC</p><p className="text-gray-900 font-mono text-sm">{selectedCustomer.floc}</p></div>
                      <div><p className="text-sm font-semibold text-gray-600">Address</p><p className="text-gray-900 text-sm">{selectedCustomer.address}</p></div>
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-2">Contact</p>
                        {Object.keys(phoneNumbers).map((type) => (
                          <div key={type} className="mb-2 flex items-center gap-2">
                            <p className="text-xs text-gray-500 w-12 capitalize">{type}:</p>
                            {editingPhone[type] ? (
                              <>
                                <input type="text" value={phoneNumbers[type]} onChange={(e) => setPhoneNumbers({ ...phoneNumbers, [type]: e.target.value })} className="flex-1 px-2 py-1 border-2 border-blue-500 rounded text-sm" />
                                <button onClick={() => setEditingPhone({ ...editingPhone, [type]: false })} className="text-green-600 p-1"><Save size={16} /></button>
                              </>
                            ) : (
                              <>
                                <p className="flex-1 text-gray-900 text-sm">{phoneNumbers[type]}</p>
                                <button onClick={() => setEditingPhone({ ...editingPhone, [type]: true })} className="text-blue-600 p-1"><Edit2 size={16} /></button>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><FileText size={20} className="text-blue-600" />Notes</h2>
                    <div className="space-y-3">
                      <div><p className="text-xs font-semibold text-blue-600 mb-1">NOTE 1 - Call Summary</p><p className="text-sm text-gray-700 bg-blue-50 p-2 rounded">Customer prefers morning appointments</p></div>
                      <div><p className="text-xs font-semibold text-green-600 mb-1">NOTE 2 - Installer Instructions</p><p className="text-sm text-gray-700 bg-green-50 p-2 rounded">Has crawl space access - needs special equipment</p></div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><Users size={20} className="text-blue-600" />Installer Info</h2>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-gray-600">Primary Installer</p>
                      <p className="text-gray-900 font-semibold">{selectedCustomer.installer.name}</p>
                      <p className="text-sm text-gray-600">Code: {selectedCustomer.installer.code}</p>
                      <p className="text-sm text-gray-600">Ward: {selectedCustomer.installer.ward}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2"><Calendar size={20} className="text-blue-600" />Installer Availability</h2>
                    <div className="relative">
                      <button onClick={() => setShowInstallerDropdown(!showInstallerDropdown)} className="flex items-center gap-2 px-4 py-2 bg-blue-50 border-2 border-blue-300 rounded-lg hover:bg-blue-100 transition">
                        <span className="font-semibold text-blue-900">{selectedInstaller.name} ({selectedInstaller.code})</span>
                        <ChevronDown size={18} />
                      </button>
                      {showInstallerDropdown && (
                        <div className="absolute top-full mt-2 right-0 w-80 bg-white rounded-lg shadow-xl border-2 border-gray-200 z-10">
                          <div className="p-2">
                            {installers.map((installer, idx) => (
                              <button key={idx} onClick={() => { setSelectedInstaller(installer); setShowInstallerDropdown(false); setSelectedSlot(null); }} className={`w-full text-left px-4 py-3 rounded-lg mb-1 transition ${isScheduleFull(installer) ? 'bg-red-50 border-2 border-red-300 hover:bg-red-100' : 'bg-green-50 border-2 border-green-300 hover:bg-green-100'}`}>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="font-semibold text-gray-900">{installer.name}</p>
                                    <p className="text-sm text-gray-600">{installer.code} - {installer.ward}</p>
                                  </div>
                                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${isScheduleFull(installer) ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                                    {isScheduleFull(installer) ? 'FULL' : 'AVAILABLE'}
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                    <div className="grid grid-cols-4 bg-gray-100">
                      <div className="p-3 font-bold text-gray-700 border-r border-gray-300">Day</div>
                      <div className="p-3 font-bold text-gray-700 text-center border-r border-gray-300">Morning<br/><span className="text-xs font-normal">8AM-12PM / 9AM-1PM</span></div>
                      <div className="p-3 font-bold text-gray-700 text-center border-r border-gray-300">Afternoon<br/><span className="text-xs font-normal">12PM-4PM / 1PM-6PM</span></div>
                      <div className="p-3 font-bold text-gray-700 text-center">Evening<br/><span className="text-xs font-normal">4PM-8PM</span></div>
                    </div>
                    {Object.entries(selectedInstaller.schedule).map(([day, slots]) => (
                      <div key={day} className="grid grid-cols-4 border-t border-gray-300">
                        <div className="p-3 font-semibold text-gray-800 border-r border-gray-300 bg-gray-50">
                          {day}
                          {day === 'Sun' && <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Works Sun</span>}
                        </div>
                        {['morning', 'afternoon', 'evening'].map((period) => {
                          const status = slots[period];
                          const isWeekend = day === 'Sat' || day === 'Sun';
                          if (period === 'evening' && isWeekend) {
                            return <div key={period} className="p-3 border-r border-gray-300 last:border-r-0 bg-gray-100 text-center text-xs text-gray-400">No Evening</div>;
                          }
                          return (
                            <button key={period} onClick={() => status === 'available' && handleSlotSelect(day, period)} disabled={status !== 'available'} className={`p-3 border-r border-r-300 last:border-r-0 font-semibold text-sm transition ${selectedSlot?.day === day && selectedSlot?.period === period ? 'bg-blue-600 text-white' : status === 'available' ? 'bg-green-100 border-green-300 text-green-800 hover:bg-green-200 cursor-pointer' : 'bg-red-100 border-red-300 text-red-800 cursor-not-allowed'}`}>
                              <div>{status === 'available' ? '✓ Available' : '✕ Full'}</div>
                              <div className="text-xs mt-1 opacity-75">{getTimeLabel(day, period)}</div>
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>

                  {isScheduleFull(selectedInstaller) && !ticketRaised && (
                    <div className="mt-4 bg-red-50 border-2 border-red-300 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="text-red-600 mt-1" size={24} />
                        <div className="flex-1">
                          <p className="font-semibold text-red-900 mb-2">All slots fully booked</p>
                          <p className="text-sm text-red-700 mb-3">Click to send ticket to scheduling staff</p>
                          <button onClick={handleRaiseTicket} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition flex items-center gap-2">
                            <Mail size={18} />Raise Scheduling Ticket
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {ticketRaised && (
                    <div className="mt-4 bg-green-50 border-2 border-green-300 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="text-green-600 mt-1" size={24} />
                        <div>
                          <p className="font-semibold text-green-900 mb-1">Ticket Raised Successfully</p>
                          <p className="text-sm text-green-700">Email sent to scheduling@neptune.com</p>
                          <div className="mt-2 bg-white p-3 rounded border border-green-200 text-xs">
                            <p><strong>FLOC:</strong> {selectedCustomer.floc}</p>
                            <p><strong>Customer:</strong> {selectedCustomer.name}</p>
                            <p><strong>Installer:</strong> {selectedInstaller.name} - All slots full</p>
                            <p className="mt-2 text-gray-600 italic">SAP will auto-update when availability added</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedSlot && !isScheduleFull(selectedInstaller) && (
                    <div className="mt-4">
                      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-4">
                        <p className="text-sm text-green-800 font-semibold mb-2">Auto-summary for Note 1:</p>
                        <p className="text-sm text-gray-700">Appointment: {selectedSlot.day} {selectedSlot.period} ({getTimeLabel(selectedSlot.day, selectedSlot.period)}) with {selectedInstaller.name}. Confirmed via {phoneNumbers.main} on {new Date().toLocaleDateString()}</p>
                      </div>
                      <button onClick={handleBookAppointment} className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-lg transition">Confirm Appointment (Click 3 of 5)</button>
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <CheckCircle size={64} className="text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Appointment Booked!</h2>
            <p className="text-xl text-gray-600 mb-6">Total clicks: {clickCount} / 5 target</p>
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-6 text-left max-w-2xl mx-auto">
              <p className="font-semibold text-gray-800 mb-3">Booking Summary:</p>
              <p className="text-gray-700 mb-1">Customer: {selectedCustomer.name}</p>
              <p className="text-gray-700 mb-1">FLOC: {selectedCustomer.floc}</p>
              <p className="text-gray-700 mb-1">Appointment: {selectedSlot.day} - {selectedSlot.period}</p>
              <p className="text-gray-700 mb-1">Installer: {selectedInstaller.name} ({selectedInstaller.code})</p>
              <p className="text-gray-700">Status: Confirmed & Synced to SAP</p>
            </div>
            <button onClick={() => { setSelectedCustomer(null); setSelectedInstaller(null); setSelectedSlot(null); setBookingComplete(false); setClickCount(0); setSearchQuery(''); }} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition">Book Another Appointment</button>
          </div>
        )}
      </div>

      {showChat && (
        <div className="fixed right-6 bottom-6 w-96 bg-white rounded-lg shadow-2xl border-2 border-blue-600 z-40">
          <div className="bg-blue-600 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold flex items-center gap-2"><MessageSquare size={18} />Field Supervisor IM</h3>
            <button onClick={() => setShowChat(false)} className="text-white hover:text-gray-200">✕</button>
          </div>
          <div className="h-64 overflow-y-auto p-4 bg-gray-50">
            {chatMessages.length === 0 ? (
              <div className="text-center mt-8">
                <p className="text-gray-500 text-sm mb-4">No messages yet. Supervisors receive desktop notifications.</p>
                <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs text-left">
                  <p className="font-semibold text-blue-900 mb-1">How supervisors see messages:</p>
                  <p className="text-blue-700">✓ Desktop popup notification</p>
                  <p className="text-blue-700">✓ Dashboard widget on SAP home</p>
                  <p className="text-blue-700">✓ Mobile app push (field work)</p>
                </div>
              </div>
            ) : (
              chatMessages.map((msg, idx) => (
                <div key={idx} className={`mb-3 ${msg.sender === 'You' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-3 rounded-lg max-w-xs ${msg.sender === 'You' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'}`}>
                    <p className="text-xs font-semibold mb-1">{msg.sender}</p>
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs opacity-75 mt-1">{msg.time}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="p-4 border-t flex gap-2">
            <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Message supervisors..." className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
            <button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition"><Send size={20} /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NeptuneSAPDemo;
