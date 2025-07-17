import React, { createContext, useContext, useState, ReactNode } from 'react';

const translations = {
  en: {
    appTitle: 'JanSuvidha Dashboard',
    subtitle: 'Empowering Bharat with Data',
    searchPlaceholder: 'Search datasets...',
    menu: 'Menu',
    home: 'Home',
    health: 'Health',
    sanitation: 'Sanitation',
    budget: 'Budget',
    education: 'Education',
    agriculture: 'Agriculture',
    welfare: 'Women & Child Welfare',
    upload: 'Upload Data',
    rti: 'RTI Submissions',
    compare: 'Compare Data',
    helpTitle: 'Need Help?',
    helpText: 'Access our comprehensive guide for using the dashboard effectively.',
    transparencyTitle: 'Transparency Through Data',
    transparencyDesc: 'Access, analyze, and understand public data to hold governments accountable and drive positive change in your community.',
    featuresTitle: 'Key Features',
    uploadTitle: 'Upload & Analyze',
    uploadDesc: 'Upload government documents and get instant insights',
    visualizeTitle: 'Visualize Data',
    visualizeDesc: 'Interactive charts, maps, and dashboards',
    compareTitle: 'Compare Regions',
    compareDesc: 'Side-by-side analysis of different areas',
    rtiTitle: 'RTI Integration',
    rtiDesc: 'Submit and track RTI responses',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    recentUploads: 'Recent Uploads',
    trendingDatasets: 'Trending Datasets',
    viewAll: 'View All'
  },
  hi: {
    appTitle: 'जनसुविधा डैशबोर्ड',
    subtitle: 'डेटा के साथ भारत को सशक्त बनाना',
    searchPlaceholder: 'डेटासेट खोजें...',
    menu: 'मेनू',
    home: 'होम',
    health: 'स्वास्थ्य',
    sanitation: 'स्वच्छता',
    budget: 'बजट',
    education: 'शिक्षा',
    agriculture: 'कृषि',
    welfare: 'महिला एवं बाल कल्याण',
    upload: 'डेटा अपलोड',
    rti: 'RTI सबमिशन',
    compare: 'डेटा तुलना',
    helpTitle: 'मदद चाहिए?',
    helpText: 'डैशबोर्ड का प्रभावी उपयोग के लिए हमारी गाइड देखें।',
    transparencyTitle: 'डेटा के माध्यम से पारदर्शिता',
    transparencyDesc: 'सरकारों को जवाबदेह बनाने और अपने समुदाय में सकारात्मक बदलाव लाने के लिए सार्वजनिक डेटा तक पहुंचें, विश्लेषण करें और समझें।',
    featuresTitle: 'मुख्य विशेषताएं',
    uploadTitle: 'अपलोड और विश्लेषण',
    uploadDesc: 'सरकारी दस्तावेज अपलोड करें और तुरंत जानकारी प्राप्त करें',
    visualizeTitle: 'डेटा दृश्य',
    visualizeDesc: 'इंटरैक्टिव चार्ट, मैप्स और डैशबोर्ड',
    compareTitle: 'क्षेत्रों की तुलना',
    compareDesc: 'विभिन्न क्षेत्रों का साइड-बाई-साइड विश्लेषण',
    rtiTitle: 'RTI एकीकरण',
    rtiDesc: 'RTI प्रतिक्रियाओं को सबमिट और ट्रैक करें',
    getStarted: 'शुरू करें',
    learnMore: 'और जानें',
    recentUploads: 'हाल की अपलोड',
    trendingDatasets: 'ट्रेंडिंग डेटासेट',
    viewAll: 'सभी देखें'
  },
  ta: {
    appTitle: 'ஜன்சுவிதா டாஷ்போர்டு',
    subtitle: 'தரவுகளால் பாரதத்தை சக்திவாய்ந்ததாக்குதல்',
    searchPlaceholder: 'தரவுகளை தேடுங்கள்...',
    menu: 'மெனு',
    home: 'முகப்பு',
    health: 'சுகாதாரம்',
    sanitation: 'சுத்தம்',
    budget: 'பட்ஜெட்',
    education: 'கல்வி',
    agriculture: 'விவசாயம்',
    welfare: 'பெண்கள் மற்றும் குழந்தைகள் நலன்',
    upload: 'தரவு பதிவேற்றம்',
    rti: 'RTI சமர்பிப்புகள்',
    compare: 'தரவு ஒப்பீடு',
    helpTitle: 'உதவி தேவையா?',
    helpText: 'டாஷ்போர்டை திறம்பட பயன்படுத்த எங்கள் வழிகாட்டியை பார்க்கவும்।',
    getStarted: 'தொடங்குங்கள்',
    learnMore: 'மேலும் அறிக',
    recentUploads: 'சமீபத்திய பதிவேற்றங்கள்',
    trendingDatasets: 'டிரெண்டிங் டேட்டாசெட்கள்',
    viewAll: 'அனைத்தையும் பார்க்க'
  },
  te: {
    appTitle: 'జన్‌సువిధా డాష్‌బోర్డ్',
    subtitle: 'డేటాతో భారతాన్ని శక్తివంతం చేయడం',
    searchPlaceholder: 'డేటాసెట్లను వెతకండి...',
    menu: 'మెను',
    home: 'హోమ్',
    health: 'ఆరోగ్యం',
    sanitation: 'పరిశుభ్రత',
    budget: 'బడ్జెట్',
    education: 'విద్య',
    agriculture: 'వ్యవసాయం',
    welfare: 'మహిళలు మరియు పిల్లల సంక్షేమం',
    upload: 'డేటా అప్‌లోడ్',
    rti: 'RTI సమర్పణలు',
    compare: 'డేటా పోలిక',
    helpTitle: 'సహాయం కావాలా?',
    helpText: 'డాష్‌బోర్డ్‌ను సమర్థవంతంగా ఉపయోగించడానికి మా గైడ్‌ను చూడండి।',
    getStarted: 'ప్రారంభించండి',
    learnMore: 'మరింత తెలుసుకోండి',
    recentUploads: 'ఇటీవలి అప్‌లోడ్‌లు',
    trendingDatasets: 'ట్రెండింగ్ డేటాసెట్‌లు',
    viewAll: 'అన్నీ చూడండి'
  },
  bn: {
    appTitle: 'জনসুবিধা ড্যাশবোর্ড',
    subtitle: 'ডেটার মাধ্যমে ভারতকে ক্ষমতায়ন',
    searchPlaceholder: 'ডেটাসেট খুঁজুন...',
    menu: 'মেনু',
    home: 'হোম',
    health: 'স্বাস্থ্য',
    sanitation: 'স্যানিটেশন',
    budget: 'বাজেট',
    education: 'শিক্ষা',
    agriculture: 'কৃষি',
    welfare: 'মহিলা ও শিশু কল্যাণ',
    upload: 'ডেটা আপলোড',
    rti: 'RTI জমা',
    compare: 'ডেটা তুলনা',
    helpTitle: 'সাহায্য প্রয়োজন?',
    helpText: 'ড্যাশবোর্ড কার্যকরভাবে ব্যবহারের জন্য আমাদের গাইড দেখুন।',
    getStarted: 'শুরু করুন',
    learnMore: 'আরও জানুন',
    recentUploads: 'সাম্প্রতিক আপলোড',
    trendingDatasets: 'ট্রেন্ডিং ডেটাসেট',
    viewAll: 'সব দেখুন'
  }
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};