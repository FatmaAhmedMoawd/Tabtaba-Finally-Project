'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { saveTherapistRegistrationData } from '@/lib/therapist-storage';
import { 
  ShieldCheck,
  FileText,
  FileUp,
  Award,
  BadgeCheck
} from 'lucide-react';

export default function TherapistRegisterStep5() {
  const router = useRouter();
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [certificateFiles, setCertificateFiles] = useState<File[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => {
      setIsAllowed(true);
    });
  }, [router]);

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTouched((prev) => ({ ...prev, cv: true }));
    setCvFile(e.target.files?.[0] ?? null);
  };

  const handleCertificatesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTouched((prev) => ({ ...prev, certificates: true }));
    setCertificateFiles(Array.from(e.target.files ?? []));
  };

  if (!isAllowed) {
    return null;
  }

  const isValidFile = (file: File | null, allowed: string[]) => {
    if (!file) return false;
    const ext = file.name.split('.').pop()?.toLowerCase();
    return !!ext && allowed.includes(ext) && file.size <= 5 * 1024 * 1024;
  };

  const isStep5Valid =
    isValidFile(cvFile, ['pdf', 'doc', 'docx']) &&
    certificateFiles.length > 0 && certificateFiles.every((file) => ['pdf', 'jpg', 'jpeg', 'png'].includes(file.name.split('.').pop()?.toLowerCase() ?? ''));

  const errors = {
    cvFile: touched.cv && !isValidFile(cvFile, ['pdf', 'doc', 'docx']) ? 'الرجاء رفع سيرة ذاتية بصيغة PDF أو DOC بحجم لا يزيد عن 5 ميغابايت.' : '',
    certificates: touched.certificates && (certificateFiles.length === 0 || !certificateFiles.every((file) => ['pdf', 'jpg', 'jpeg', 'png'].includes(file.name.split('.').pop()?.toLowerCase() ?? ''))) ? 'الرجاء رفع شهادات صحيحة بصيغة PDF أو JPG.' : '',
  };

  const selectedCvName = cvFile ? cvFile.name : '';
  const selectedCertificateNames = certificateFiles.map((file) => file.name).join(', ');

  const handleRegister = () => {
    saveTherapistRegistrationData({
      cvFileName: cvFile?.name,
      certificateFileNames: certificateFiles.map((file) => file.name),
    });
    router.push('/therapist/dashboard');
  };

  return (
    <div className="min-h-[100dvh] bg-white font-inter relative pb-28 md:flex md:flex-col md:items-center w-full">
      {/* Header Area */}
      <div className="w-full relative max-w-md mx-auto md:max-w-3xl md:mt-12 bg-white pt-10 md:pt-12 pb-6 px-6 md:px-12 overflow-hidden shadow-sm shadow-gray-100/50 md:shadow-none rounded-b-[38px] md:rounded-[32px]">
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-20 h-16 md:hidden mb-4">
            <Image
              src="https://i.postimg.cc/XvC9dkkh/photo-2026-05-14-14-47-12.jpg"
              alt="Tabtaba Logo"
              fill
              className="object-contain mix-blend-multiply scale-[1.3]"
              priority
            />
          </div>

          {/* Desktop Logo Box */}
          <div className="hidden md:flex p-6 w-32 h-32 items-center justify-center relative mb-6 rounded-2xl md:bg-white md:shadow-sm">
             <Image
                src="https://i.postimg.cc/XvC9dkkh/photo-2026-05-14-14-47-12.jpg"
                alt="Tabtaba Logo"
                fill
                className="object-contain scale-[0.8]"
                priority
              />
          </div>

          <div className="flex items-center gap-2 text-[#0A9D46] mb-8 md:mb-10 lg:scale-[1.3] transform origin-center">
            <ShieldCheck size={24} strokeWidth={2.5} fill="currentColor" className="text-white fill-[#0A9D46]" />
            <h1 className="text-[20px] md:text-[22px] font-extrabold tracking-tight">
              Verification
            </h1>
          </div>

          <div className="w-full flex items-center justify-between px-6 md:px-16 lg:px-32 mb-2 lg:scale-[1.1] transform origin-left">
             <span className="text-[#0A9D46] text-[12px] font-bold">Step 5 of 5</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full px-6 md:px-16 lg:px-32 relative h-1 md:h-1.5 mb-2 lg:mb-4 lg:scale-[1.1] transform origin-left">
            <div className="w-full h-1 md:h-1.5 bg-[#E2E8F0] md:bg-[#D7ECDY] rounded-full absolute top-0 left-0" />
            <div className="h-1 md:h-1.5 bg-[#22C55E] rounded-full absolute top-0 left-0" style={{ width: '100%' }} />
            {/* The dot at 100% */}
            <div className="w-3 h-3 md:w-4 md:h-4 bg-[#22C55E] rounded-full absolute top-1/2 -translate-y-1/2 shadow-sm" style={{ left: '100%', transform: 'translate(-50%, -50%)' }} />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto md:max-w-3xl px-6 pt-6 pb-20 md:pb-28 flex flex-col gap-6 md:px-12 w-full">
        
        {/* Upload CV */}
        <div className="bg-[#F8FAFB] border border-[#F1F5F9] rounded-[24px] p-6 shadow-sm flex flex-col gap-4">
           <div className="flex flex-col gap-1.5">
             <div className="flex items-center gap-3">
               <FileText size={22} strokeWidth={2.5} className="text-[#1A5693]" />
               <h2 className="text-[18px] md:text-[20px] font-extrabold text-gray-900 tracking-tight">Upload your CV</h2>
             </div>
             <p className="text-[14px] text-gray-600 font-medium leading-snug pr-2">
               Provide your latest professional resume detailing clinical history and specialized certifications.
             </p>
           </div>

           <label className="border-2 border-dashed border-[#CBD5E1] rounded-[20px] bg-transparent py-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50/50 transition-colors mt-2">
              <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleCvChange} />
              <div className="w-14 h-14 bg-[#E8F0F8] rounded-full flex items-center justify-center mb-4">
                 <FileUp size={24} strokeWidth={2.5} className="text-[#1A5693]" />
              </div>
              <span className="text-[16px] font-bold text-gray-900 mb-1">Click to select or drag here</span>
              <span className="text-[13px] text-gray-500 font-medium">PDF, DOC (Max 5MB)</span>
              {selectedCvName && <span className="text-[13px] text-[#0A9D46] mt-3">Selected: {selectedCvName}</span>}
           </label>
           {errors.cvFile && <p className="text-[13px] text-red-500 font-medium px-1 mt-2">{errors.cvFile}</p>}
        </div>

        {/* Upload Certified Certificates */}
        <div className="bg-[#F8FAFB] border border-[#F1F5F9] rounded-[24px] p-6 shadow-sm flex flex-col gap-4">
           <div className="flex flex-col gap-1.5">
             <div className="flex items-center gap-3">
               <Award size={22} strokeWidth={2.5} className="text-[#1A5693]" />
               <h2 className="text-[18px] md:text-[20px] font-extrabold text-gray-900 tracking-tight leading-tight">Upload Certified<br className="md:hidden"/> Certificates</h2>
             </div>
             <p className="text-[14px] text-gray-600 font-medium leading-snug pr-2">
               Education, Professional Practice licenses, and Experience certificates from previous institutions.
             </p>
           </div>

           <label className="border-2 border-dashed border-[#CBD5E1] rounded-[20px] bg-transparent py-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50/50 transition-colors mt-2">
              <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" multiple onChange={handleCertificatesChange} />
              <div className="w-14 h-14 bg-[#E8F0F8] rounded-full flex items-center justify-center mb-4">
                 <BadgeCheck size={26} strokeWidth={2.5} className="text-[#1A5693]" />
              </div>
              <span className="text-[16px] font-bold text-gray-900 mb-1">Click to select or drag here</span>
              <span className="text-[13px] text-gray-500 font-medium">Multiple files supported (PDF, JPG)</span>
              {selectedCertificateNames && <span className="text-[13px] text-[#0A9D46] mt-3">Selected: {selectedCertificateNames}</span>}
           </label>
           {errors.certificates && <p className="text-[13px] text-red-500 font-medium px-1 mt-2">{errors.certificates}</p>}
        </div>

        {/* Registration Button */}
        <div className="w-full flex items-center justify-center mt-6">
           <button
             type="button"
             disabled={!isStep5Valid}
             onClick={handleRegister}
             className={`bg-[#3BB269] text-white px-12 md:px-16 py-4 rounded-full font-bold text-[18px] shadow-[0_4px_16px_rgba(59,178,105,0.3)] transition-transform active:scale-95 text-center ${!isStep5Valid ? 'opacity-60 cursor-not-allowed hover:bg-[#3BB269]' : 'hover:bg-[#34A05D]'}`}
           >
              registration
           </button>
        </div>

      </div>
    </div>
  );
}
