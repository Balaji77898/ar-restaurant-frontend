'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/Icon';

import { Animated } from '@/components/Animated';
import { useAuth, StaffRole } from '@/contexts/AuthContext';

export default function StaffLogin() {
  const { setRole } = useAuth();
  const router = useRouter();
  
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<StaffRole | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleLogin = () => {
    if (!selectedRole) return;
    setRole(selectedRole);
    router.push('/staff-dashboard');
  };

  return (
    <div className="min-h-screen flex font-sans overflow-hidden bg-ivory">
      {/* Left Side - Visuals */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary items-center justify-center p-12 overflow-hidden">
         <div className="absolute inset-0 opacity-20">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
        </div>
        
        {/* Decorative Circles */}
        <Animated type="fadeIn" delay={0.2} duration={1}>
           <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/20 blur-3xl"></div>
        </Animated>
        <Animated type="fadeIn" delay={0.4} duration={1}>
           <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-white/10 blur-3xl"></div>
        </Animated>

        <div className="relative z-10 text-center max-w-lg">
           <Animated type="fadeInUp" duration={0.6}>
               <div className="w-32 h-32 mx-auto bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mb-8 shadow-2xl border border-white/20">
                   <Icon name="restaurant" size={64} color="#FFFFFF" />
               </div>
               <h1 className="text-6xl font-serif font-black text-white mb-4 leading-tight">
                  Staff<br/>Portal
               </h1>
               <p className="text-xl text-white/80 font-medium">
                  Manage orders, payments, and tables efficiently.
               </p>
           </Animated>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative">
          <div className="absolute inset-0 opacity-30 pointer-events-none">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
          </div>

          <div className="w-full max-w-md">
             <Animated type="fadeInUp" delay={0.2} duration={0.6}>
                 <div className="text-center mb-10 lg:hidden">
                     <div className="w-20 h-20 mx-auto bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                         <Icon name="restaurant" size={40} color="white" />
                     </div>
                     <h2 className="text-3xl font-serif text-slate-900 font-black">Staff Portal</h2>
                     <p className="text-slate-500">Sign in to continue</p>
                 </div>

                 <div className="bg-white rounded-[40px] shadow-card border border-slate-100 p-8 md:p-10 relative overflow-hidden">
                     {/* Top highlight line */}
                     <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-gold to-primary"></div>
                     
                     <div className="mb-8 text-center">
                         <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h2>
                         <p className="text-slate-500 text-sm">Please identify your role and sign in</p>
                     </div>

                     {/* Role Selection */}
                     <div className="mb-8">
                         <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block text-center">Select Role</label>
                         <div className="grid grid-cols-2 gap-4">
                              {[
                                { role: 'server' as StaffRole, icon: 'restaurant-outline' as const, label: 'Server' },
                                { role: 'cashier' as StaffRole, icon: 'wallet-outline' as const, label: 'Cashier' },
                              ].map((item) => (
                                <button
                                  key={item.role}
                                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                                    selectedRole === item.role
                                      ? 'border-primary bg-primary/5 shadow-md transform scale-[1.02]'
                                      : 'border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-200'
                                  }`}
                                  onClick={() => setSelectedRole(item.role)}
                                >
                                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${selectedRole === item.role ? 'bg-primary text-white' : 'bg-white text-slate-400'}`}>
                                      <Icon name={item.icon} size={24} color="currentColor" />
                                  </div>
                                  <span className={`font-bold ${selectedRole === item.role ? 'text-primary' : 'text-slate-600'}`}>{item.label}</span>
                                </button>
                              ))}
                         </div>
                     </div>

                     {/* Form */}
                     <div className="space-y-5">
                         <div className="group">
                             <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Staff ID</label>
                             <div className={`flex items-center px-4 py-3 rounded-xl border-2 transition-colors ${focusedInput === 'staffId' ? 'border-primary bg-primary/5' : 'border-slate-100 bg-slate-50 group-hover:border-slate-300'}`}>
                                 <Icon name="person-outline" size={20} color={focusedInput === 'staffId' ? '#7B1F1F' : '#94a3b8'} className="mr-3" />
                                 <input
                                     type="text"
                                     className="flex-1 bg-transparent outline-none font-medium text-slate-900 placeholder:text-slate-400"
                                     placeholder="Enter your ID"
                                     value={staffId}
                                     onChange={(e) => setStaffId(e.target.value)}
                                     onFocus={() => setFocusedInput('staffId')}
                                     onBlur={() => setFocusedInput(null)}
                                 />
                             </div>
                         </div>

                         <div className="group">
                             <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Password</label>
                             <div className={`flex items-center px-4 py-3 rounded-xl border-2 transition-colors ${focusedInput === 'password' ? 'border-primary bg-primary/5' : 'border-slate-100 bg-slate-50 group-hover:border-slate-300'}`}>
                                 <Icon name="lock-closed-outline" size={20} color={focusedInput === 'password' ? '#7B1F1F' : '#94a3b8'} className="mr-3" />
                                 <input
                                     type={showPassword ? "text" : "password"}
                                     className="flex-1 bg-transparent outline-none font-medium text-slate-900 placeholder:text-slate-400"
                                     placeholder="Enter password"
                                     value={password}
                                     onChange={(e) => setPassword(e.target.value)}
                                     onFocus={() => setFocusedInput('password')}
                                     onBlur={() => setFocusedInput(null)}
                                 />
                                 <button
                                     type="button"
                                     onClick={() => setShowPassword(!showPassword)}
                                     className="ml-2 text-slate-400 hover:text-slate-600 outline-none"
                                 >
                                     <Icon name={showPassword ? "eye-off" : "eye"} size={20} />
                                 </button>
                             </div>
                         </div>

                         <button
                            className={`w-full py-4 rounded-xl font-bold text-white text-lg shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 ${!selectedRole ? 'bg-slate-300 cursor-not-allowed' : 'bg-gradient-to-r from-primary to-[#9B2B2B] hover:shadow-xl'}`}
                            onClick={handleLogin}
                            disabled={!selectedRole}
                         >
                            Sign In
                         </button>
                     </div>
                 </div>

                 <p className="text-center mt-8 text-slate-400 text-sm font-medium">
                    &copy; 2024 Restaurant OS. All rights reserved.
                 </p>
             </Animated>
          </div>
      </div>
    </div>
  );
}
