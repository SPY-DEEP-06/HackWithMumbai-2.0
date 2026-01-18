import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { QRCodeSVG } from 'qrcode.react';
import gsap from 'gsap';
import {
  Users,
  CreditCard,
  FileText,
  Download,
  Edit3,
  LogOut,
  Check,
  AlertCircle,
  Clock
} from 'lucide-react';

interface RegistrationData {
  teamName: string;
  teamSize: number;
  leaderDetails: {
    fullName: string;
    email: string;
    mobile: string;
    city: string;
    state: string;
    qualification: string;
    branch: string;
    institution: string;
    enrollmentNumber: string;
    currentlyStudying: string;
    year: string;
  };
  members: Array<{
    fullName: string;
    email: string;
    mobile: string;
    city: string;
    state: string;
    qualification: string;
    branch: string;
    institution: string;
    enrollmentNumber: string;
    currentlyStudying: string;
    year: string;
  }>;
  payment: {
    status: string;
    amount: number;
    transactionId: string;
    paymentDate: string;
  };
  uniqueHexId: string;
  qrCodeData: string;
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<RegistrationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setData(docSnap.data() as RegistrationData);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    gsap.fromTo('.dashboard-content',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [activeTab]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const downloadInvoice = () => {
    if (!data) return;
    
    // Create invoice content
    const invoiceContent = `
═══════════════════════════════════════════════════════
                   OFFICIAL RECEIPT
               HACKWITHINDIA BVUDET NM CHAPTER
═══════════════════════════════════════════════════════

UNIQUE ID: ${data.uniqueHexId}
TRANSACTION ID: ${data.payment.transactionId}
DATE: ${new Date(data.payment.paymentDate).toLocaleDateString()}

───────────────────────────────────────────────────────
TEAM DETAILS
───────────────────────────────────────────────────────
Team Name: ${data.teamName}
Team Size: ${data.teamSize} members

LEADER:
  Name: ${data.leaderDetails.fullName}
  Email: ${data.leaderDetails.email}
  Institution: ${data.leaderDetails.institution}

${data.members.map((m, i) => `MEMBER ${i + 2}:
  Name: ${m.fullName}
  Email: ${m.email}
  Institution: ${m.institution}
`).join('\n')}
───────────────────────────────────────────────────────
PAYMENT DETAILS
───────────────────────────────────────────────────────
Amount Paid: ₹${data.payment.amount}
Status: ${data.payment.status.toUpperCase()}
Payment Date: ${new Date(data.payment.paymentDate).toLocaleString()}

═══════════════════════════════════════════════════════
                DIGITALLY SIGNED BY
           HACKWITHINDIA BVUDET NM CHAPTER
═══════════════════════════════════════════════════════
    `;

    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HackWithIndia_Receipt_${data.uniqueHexId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-hackathon-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-hackathon-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-hackathon-orange font-courier">LOADING DATA...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="fixed inset-0 vignette pointer-events-none" />
        <div className="scanline" />
        
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="tva-terminal max-w-md w-full p-8 text-center">
            <AlertCircle className="w-16 h-16 text-hackathon-orange mx-auto mb-4" />
            <h2 className="text-2xl font-orbitron text-hackathon-orange mb-4">No Registration Found</h2>
            <p className="text-gray-400 font-courier mb-6">
              You haven't registered for the hackathon yet.
            </p>
            <button 
              onClick={() => navigate('/register')}
              className="btn-primary font-orbitron"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isPaid = data.payment.status === 'paid';

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Users },
    { id: 'team', label: 'Team Details', icon: Users },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'documents', label: 'Documents', icon: FileText },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      <div className="fixed inset-0 vignette pointer-events-none" />
      <div className="scanline" />

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="border-b border-hackathon-orange/30 bg-black/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-cinzel font-bold gradient-text">Dashboard</h1>
              <p className="text-sm text-gray-400 font-courier">Welcome, {data.leaderDetails.fullName}</p>
            </div>
            <button
              onClick={handleLogout}
              className="btn-secondary flex items-center gap-2 text-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="hackathon-card text-center">
              <p className="text-gray-400 font-courier text-sm mb-1">Team</p>
              <p className="text-xl font-orbitron text-hackathon-orange">{data.teamName}</p>
            </div>
            <div className="hackathon-card text-center">
              <p className="text-gray-400 font-courier text-sm mb-1">Size</p>
              <p className="text-xl font-orbitron text-hackathon-orange">{data.teamSize}</p>
            </div>
            <div className="hackathon-card text-center">
              <p className="text-gray-400 font-courier text-sm mb-1">Unique ID</p>
              <p className="text-xl font-orbitron text-hackathon-orange">{data.uniqueHexId}</p>
            </div>
            <div className="hackathon-card text-center">
              <p className="text-gray-400 font-courier text-sm mb-1">Status</p>
              <div className={`flex items-center justify-center gap-2 ${isPaid ? 'text-hackathon-loki' : 'text-yellow-500'}`}>
                {isPaid ? <Check className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                <span className="text-xl font-orbitron">{isPaid ? 'Paid' : 'Pending'}</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-courier text-sm whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-hackathon-orange text-black'
                      : 'bg-black/50 text-gray-400 hover:text-hackathon-orange border border-hackathon-orange/30'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="dashboard-content tva-terminal p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-hackathon-orange/30 pb-4">
                  <h2 className="text-xl font-orbitron text-hackathon-orange">Registration Overview</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="hackathon-card">
                      <h3 className="text-hackathon-orange font-courier mb-3">Team Information</h3>
                      <div className="space-y-2 text-sm font-courier">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Team Name:</span>
                          <span>{data.teamName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Team Size:</span>
                          <span>{data.teamSize} members</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Unique ID:</span>
                          <span className="text-hackathon-orange">{data.uniqueHexId}</span>
                        </div>
                      </div>
                    </div>

                    <div className="hackathon-card">
                      <h3 className="text-hackathon-orange font-courier mb-3">Payment Status</h3>
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          isPaid ? 'bg-hackathon-loki/20' : 'bg-yellow-500/20'
                        }`}>
                          {isPaid ? <Check className="w-6 h-6 text-hackathon-loki" /> : <Clock className="w-6 h-6 text-yellow-500" />}
                        </div>
                        <div>
                          <p className={`font-orbitron ${isPaid ? 'text-hackathon-loki' : 'text-yellow-500'}`}>
                            {isPaid ? 'Payment Confirmed' : 'Payment Pending'}
                          </p>
                          <p className="text-sm text-gray-400 font-courier">₹{data.payment.amount}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="hackathon-card flex flex-col items-center justify-center">
                    <p className="text-gray-400 font-courier mb-4">Your Entry QR Code</p>
                    <div className="bg-white p-4 rounded-lg">
                      <QRCodeSVG value={data.qrCodeData} size={180} />
                    </div>
                    <p className="text-xs text-gray-500 font-courier mt-4 text-center">
                      Show this at the venue for verification
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-hackathon-orange/30 pb-4">
                  <h2 className="text-xl font-orbitron text-hackathon-orange">Team Details</h2>
                  {!isPaid && (
                    <button className="btn-secondary flex items-center gap-2 text-sm">
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </button>
                  )}
                </div>

                {isPaid && (
                  <div className="bg-hackathon-orange/10 border border-hackathon-orange/30 rounded-lg p-4 mb-4">
                    <p className="text-sm font-courier text-hackathon-orange flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Team details are locked after payment. Contact support for changes.
                    </p>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Leader */}
                  <div className="hackathon-card">
                    <h3 className="text-hackathon-orange font-courier mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Member 01 (Team Leader)
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm font-courier">
                      <div><span className="text-gray-400">Name:</span> {data.leaderDetails.fullName}</div>
                      <div><span className="text-gray-400">Email:</span> {data.leaderDetails.email}</div>
                      <div><span className="text-gray-400">Mobile:</span> {data.leaderDetails.mobile}</div>
                      <div><span className="text-gray-400">City:</span> {data.leaderDetails.city}</div>
                      <div><span className="text-gray-400">State:</span> {data.leaderDetails.state}</div>
                      <div><span className="text-gray-400">Institution:</span> {data.leaderDetails.institution}</div>
                      <div><span className="text-gray-400">Qualification:</span> {data.leaderDetails.qualification}</div>
                      <div><span className="text-gray-400">Branch:</span> {data.leaderDetails.branch}</div>
                    </div>
                  </div>

                  {/* Other Members */}
                  {data.members.map((member, index) => (
                    <div key={index} className="hackathon-card">
                      <h3 className="text-hackathon-orange font-courier mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Member {String(index + 2).padStart(2, '0')}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm font-courier">
                        <div><span className="text-gray-400">Name:</span> {member.fullName}</div>
                        <div><span className="text-gray-400">Email:</span> {member.email}</div>
                        <div><span className="text-gray-400">Mobile:</span> {member.mobile}</div>
                        <div><span className="text-gray-400">City:</span> {member.city}</div>
                        <div><span className="text-gray-400">State:</span> {member.state}</div>
                        <div><span className="text-gray-400">Institution:</span> {member.institution}</div>
                        <div><span className="text-gray-400">Qualification:</span> {member.qualification}</div>
                        <div><span className="text-gray-400">Branch:</span> {member.branch}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="space-y-6">
                <div className="border-b border-hackathon-orange/30 pb-4">
                  <h2 className="text-xl font-orbitron text-hackathon-orange">Payment History</h2>
                </div>

                <div className="hackathon-card">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isPaid ? 'bg-hackathon-loki/20' : 'bg-yellow-500/20'
                      }`}>
                        {isPaid ? <Check className="w-5 h-5 text-hackathon-loki" /> : <Clock className="w-5 h-5 text-yellow-500" />}
                      </div>
                      <div>
                        <p className="font-orbitron text-white">Registration Fee</p>
                        <p className="text-sm text-gray-400 font-courier">
                          {new Date(data.payment.paymentDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-orbitron text-hackathon-orange">₹{data.payment.amount}</p>
                      <p className={`text-sm font-courier ${isPaid ? 'text-hackathon-loki' : 'text-yellow-500'}`}>
                        {data.payment.status.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-hackathon-orange/30 pt-4">
                    <div className="text-sm font-courier space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Transaction ID:</span>
                        <span>{data.payment.transactionId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Payment Date:</span>
                        <span>{new Date(data.payment.paymentDate).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {!isPaid && (
                  <button className="btn-primary w-full font-orbitron">
                    Complete Payment
                  </button>
                )}
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-6">
                <div className="border-b border-hackathon-orange/30 pb-4">
                  <h2 className="text-xl font-orbitron text-hackathon-orange">Documents</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="hackathon-card">
                    <h3 className="text-hackathon-orange font-courier mb-4">Official Receipt</h3>
                    <div className="text-sm font-courier text-gray-400 mb-4">
                      <p>• Team Size: {data.teamSize} members</p>
                      <p>• Amount: ₹{data.payment.amount}</p>
                      <p>• Transaction ID: {data.payment.transactionId}</p>
                      <p>• Unique ID: {data.uniqueHexId}</p>
                    </div>
                    <button
                      onClick={downloadInvoice}
                      className="btn-secondary w-full flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download Receipt
                    </button>
                  </div>

                  <div className="hackathon-card flex flex-col items-center">
                    <h3 className="text-hackathon-orange font-courier mb-4">Entry QR Code</h3>
                    <div className="bg-white p-4 rounded-lg mb-4">
                      <QRCodeSVG value={data.qrCodeData} size={150} />
                    </div>
                    <p className="text-xs text-gray-500 font-courier text-center">
                      Digitally signed by<br/>
                      HACKWITHINDIA BVUDET NM CHAPTER
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
