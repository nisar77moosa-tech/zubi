import React, { useState } from 'react';
import { X, Download, Smartphone, CheckCircle2, ShieldCheck, Terminal, Copy, Check, ExternalLink, Zap } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface InstallApkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallApkModal: React.FC<InstallApkModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isAndroid, isIOS, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'instant' | 'package'>('instant');
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [isInstalling, setIsInstalling] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    setIsInstalling(true);
    try {
      const success = await install();
      if (success) {
        onClose();
      }
    } finally {
      setIsInstalling(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(key);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  // Generate downloadable Flutter project with APK build script
  const downloadFlutterApkProject = () => {
    const flutterMainDart = `import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

void main() {
  runApp(const MakranFixApp());
}

class MakranFixApp extends StatelessWidget {
  const MakranFixApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Makran Fix',
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xff6a11cb),
          brightness: Brightness.light,
        ),
        fontFamily: 'Arial',
      ),
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});
  final String phoneNumber = '03323819288';

  Future<void> callShop() async {
    final Uri url = Uri.parse('tel:$phoneNumber');
    if (await canLaunchUrl(url)) {
      await launchUrl(url);
    }
  }

  Future<void> openWhatsApp() async {
    final Uri url = Uri.parse(
      'https://wa.me/923323819288?text=Hello%20Makran%20Lab,%20I%20need%20mobile%20repair.',
    );
    if (await canLaunchUrl(url)) {
      await launchUrl(url, mode: LaunchMode.externalApplication);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xfff5f5f7),
      appBar: AppBar(
        backgroundColor: const Color(0xff6a11cb),
        foregroundColor: Colors.white,
        title: const Text('MAKRAN FIX 🔧', style: TextStyle(fontWeight: FontWeight.bold, letterSpacing: 1)),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                gradient: const LinearGradient(colors: [Color(0xff6a11cb), Color(0xff2575fc)]),
                borderRadius: BorderRadius.circular(25),
              ),
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Your Phone.', style: TextStyle(color: Colors.white, fontSize: 30, fontWeight: FontWeight.bold)),
                  Text('Our Fix. 🔧', style: TextStyle(color: Colors.white, fontSize: 30, fontWeight: FontWeight.bold)),
                  SizedBox(height: 10),
                  Text('Fast & reliable mobile phone repair.', style: TextStyle(color: Colors.white70, fontSize: 16)),
                ],
              ),
            ),
            const SizedBox(height: 25),
            const Text('What is wrong with your phone?', style: TextStyle(fontSize: 21, fontWeight: FontWeight.bold)),
            const SizedBox(height: 15),
            GridView.count(
              crossAxisCount: 2,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              mainAxisSpacing: 12,
              crossAxisSpacing: 12,
              childAspectRatio: 1.25,
              children: [
                repairCard(context, '💥', 'Broken Screen', 'Display damaged'),
                repairCard(context, '🔋', 'Battery', 'Battery problem'),
                repairCard(context, '⚡', 'Charging', 'Not charging'),
                repairCard(context, '📷', 'Camera', 'Camera problem'),
                repairCard(context, '🔊', 'Speaker', 'Sound problem'),
                repairCard(context, '📶', 'Network', 'Signal problem'),
                repairCard(context, '💧', 'Water Damage', 'Phone got wet'),
                repairCard(context, '❓', 'Other', 'Something else'),
              ],
            ),
            const SizedBox(height: 25),
            SizedBox(
              width: double.infinity,
              height: 55,
              child: ElevatedButton.icon(
                onPressed: () {
                  Navigator.push(context, MaterialPageRoute(builder: (_) => const BookingScreen()));
                },
                icon: const Icon(Icons.build),
                label: const Text('BOOK A REPAIR', style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold)),
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xff581c87),
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
                ),
              ),
            ),
            const SizedBox(height: 15),
            SizedBox(
              width: double.infinity,
              height: 55,
              child: ElevatedButton.icon(
                onPressed: openWhatsApp,
                icon: const Icon(Icons.chat),
                label: const Text('CHAT ON WHATSAPP', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.green,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
                ),
              ),
            ),
            const SizedBox(height: 15),
            SizedBox(
              width: double.infinity,
              height: 55,
              child: OutlinedButton.icon(
                onPressed: callShop,
                icon: const Icon(Icons.phone),
                label: const Text('CALL MAKRAN LAB', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                style: OutlinedButton.styleFrom(
                  foregroundColor: const Color(0xff581c87),
                  side: const BorderSide(color: Color(0xff581c87), width: 2),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
                ),
              ),
            ),
            const SizedBox(height: 30),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20)),
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('📍 Makran Lab', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                  SizedBox(height: 8),
                  Text('Amma Tower, Saddar, B-80, PN', style: TextStyle(fontSize: 16)),
                  SizedBox(height: 8),
                  Text('📞 03323819288', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget repairCard(BuildContext context, String emoji, String title, String subtitle) {
    return InkWell(
      borderRadius: BorderRadius.circular(18),
      onTap: () {
        Navigator.push(context, MaterialPageRoute(builder: (_) => BookingScreen(problem: title)));
      },
      child: Container(
        padding: const EdgeInsets.all(15),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(18),
          boxShadow: [BoxShadow(color: Colors.black.withOpacity(.06), blurRadius: 8, offset: const Offset(0, 4))],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(emoji, style: const TextStyle(fontSize: 32)),
            const SizedBox(height: 8),
            Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
            const SizedBox(height: 3),
            Text(subtitle, style: TextStyle(color: Colors.grey.shade600, fontSize: 12)),
          ],
        ),
      ),
    );
  }
}

class BookingScreen extends StatefulWidget {
  final String? problem;
  const BookingScreen({super.key, this.problem});

  @override
  State<BookingScreen> createState() => _BookingScreenState();
}

class _BookingScreenState extends State<BookingScreen> {
  final nameController = TextEditingController();
  final phoneController = TextEditingController();
  final modelController = TextEditingController();
  String selectedProblem = 'Select problem';

  @override
  void initState() {
    super.initState();
    if (widget.problem != null) {
      selectedProblem = widget.problem!;
    }
  }

  void submitBooking() {
    if (nameController.text.isEmpty ||
        phoneController.text.isEmpty ||
        modelController.text.isEmpty ||
        selectedProblem == 'Select problem') {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please complete all information.')),
      );
      return;
    }
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text('Repair Booked ✅'),
        content: const Text('Your repair request has been received.\\n\\nMakran Lab will contact you shortly.'),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pop(context);
            },
            child: const Text('DONE'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xff6a11cb),
        foregroundColor: Colors.white,
        title: const Text('Book Repair'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Tell us about your phone', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            const SizedBox(height: 25),
            TextField(controller: nameController, decoration: inputDecoration('Your name', Icons.person)),
            const SizedBox(height: 15),
            TextField(controller: phoneController, keyboardType: TextInputType.phone, decoration: inputDecoration('Phone number', Icons.phone)),
            const SizedBox(height: 15),
            TextField(controller: modelController, decoration: inputDecoration('Mobile model e.g. iPhone 13', Icons.phone_android)),
            const SizedBox(height: 15),
            DropdownButtonFormField<String>(
              value: selectedProblem,
              decoration: inputDecoration('Repair problem', Icons.build),
              items: const [
                'Select problem',
                'Broken Screen',
                'Battery',
                'Charging',
                'Camera',
                'Speaker',
                'Network',
                'Water Damage',
                'Software',
                'Other',
              ].map((p) => DropdownMenuItem(value: p, child: Text(p))).toList(),
              onChanged: (val) => setState(() => selectedProblem = val!),
            ),
            const SizedBox(height: 30),
            SizedBox(
              width: double.infinity,
              height: 55,
              child: ElevatedButton(
                onPressed: submitBooking,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xff6a11cb),
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
                ),
                child: const Text('SUBMIT REPAIR REQUEST', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  InputDecoration inputDecoration(String label, IconData icon) {
    return InputDecoration(
      labelText: label,
      prefixIcon: Icon(icon),
      filled: true,
      fillColor: Colors.grey.shade100,
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(15), borderSide: BorderSide.none),
    );
  }
}
`;

    const blob = new Blob([flutterMainDart], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'main.dart';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white rounded-[26px] shadow-2xl overflow-hidden border border-purple-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center border border-white/20">
              <Smartphone className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg tracking-wide leading-tight">
                  Makran Fix Android APK
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                  v1.0.0 Release
                </span>
              </div>
              <p className="text-xs text-white/80">
                Install as Native App on Android or Download APK Source
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-2 shrink-0">
          <button
            onClick={() => setActiveTab('instant')}
            className={`pb-2.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'instant'
                ? 'border-purple-600 text-purple-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-500" />
            <span>1-Click Phone Install (WebAPK)</span>
          </button>

          <button
            onClick={() => setActiveTab('package')}
            className={`pb-2.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'package'
                ? 'border-purple-600 text-purple-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4 text-purple-600" />
            <span>Build Standalone .APK File</span>
          </button>
        </div>

        {/* Tab content */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-800">
          {activeTab === 'instant' ? (
            /* TAB 1: Instant WebAPK Install */
            <div className="space-y-4">
              {/* App Identity Card */}
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-center gap-4">
                <img
                  src="/pwa-192x192.png"
                  alt="Makran Fix Logo"
                  className="w-16 h-16 rounded-2xl shadow-md border border-purple-200 shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/icon.svg';
                  }}
                />
                <div className="space-y-1">
                  <h4 className="font-extrabold text-base text-slate-900 leading-tight">
                    Makran Fix · Makran Lab
                  </h4>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-slate-500">
                    <span>Package: <strong className="text-slate-700 font-mono">com.makranlab.makranfix</strong></span>
                    <span>·</span>
                    <span>Size: <strong className="text-emerald-700">Instant (No storage bloat)</strong></span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold pt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Android WebAPK · Offline Capable · Auto-Updates</span>
                  </div>
                </div>
              </div>

              {isInstalled ? (
                /* Already installed status */
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm">
                    Makran Fix is already installed!
                  </h5>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    You can launch it anytime directly from your Android phone's home screen or app drawer.
                  </p>
                </div>
              ) : isInstallable ? (
                /* Native browser prompt is ready */
                <div className="space-y-3">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Android will generate and install the official <strong>Makran Fix WebAPK</strong> package directly onto your phone without requiring manual file transfers or third-party stores.
                  </p>

                  <button
                    onClick={handleInstallClick}
                    disabled={isInstalling}
                    className="w-full h-[52px] rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <Download className="w-5 h-5" />
                    <span>{isInstalling ? 'INSTALLING TO ANDROID...' : 'INSTALL MAKRAN FIX APK NOW'}</span>
                  </button>
                </div>
              ) : (
                /* Manual Android Chrome / Browser instructions */
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
                    <span className="font-bold text-slate-900 block text-sm">
                      📱 How to install on your Android phone:
                    </span>
                    <ol className="space-y-2 list-decimal list-inside text-slate-600 leading-relaxed">
                      <li>
                        Open this website in <strong>Google Chrome</strong> or <strong>Samsung Internet</strong> on your phone.
                      </li>
                      <li>
                        Tap the <strong>three dots (⋮)</strong> menu in the top-right corner of Chrome.
                      </li>
                      <li>
                        Tap <strong>"Install app"</strong> (or <strong>"Add to Home screen"</strong>).
                      </li>
                      <li>
                        Tap <strong>"Install"</strong>. Android will create the official APK with the Makran Fix icon in your app drawer!
                      </li>
                    </ol>
                  </div>

                  {isIOS && (
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
                      <strong>iPhone / iOS User?</strong> Tap the Safari <strong>Share button</strong> (square with arrow) and tap <strong>Add to Home Screen</strong>.
                    </div>
                  )}
                </div>
              )}

              {/* Benefits checklist */}
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Full-screen app mode (no URL bar)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Direct 1-tap WhatsApp chat</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Saves repair ticket offline</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Fast instant loading</span>
                </div>
              </div>
            </div>
          ) : (
            /* TAB 2: Standalone .APK File Generation & Build Commands */
            <div className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                If you need a standalone <strong>.apk binary file</strong> (e.g. for sideloading or sharing on WhatsApp), you can build the release APK using either the original <strong>Flutter project</strong> or <strong>PWABuilder / Bubblewrap</strong>.
              </p>

              {/* Method 1: Flutter APK Build Command */}
              <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-800">
                  <span className="font-bold text-amber-400">Method 1: Flutter Release APK Command</span>
                  <button
                    onClick={() => copyToClipboard('flutter build apk --release', 'flutter')}
                    className="flex items-center gap-1 text-[11px] text-purple-300 hover:text-white cursor-pointer"
                  >
                    {copiedCommand === 'flutter' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="font-mono text-xs overflow-x-auto p-2 bg-black/40 rounded-lg text-emerald-300">
                  flutter build apk --release
                </pre>
                <p className="text-[11px] text-slate-400">
                  Generates ready APK at: <code className="text-amber-200">build/app/outputs/flutter-apk/app-release.apk</code>
                </p>
              </div>

              {/* Download Flutter Source Button */}
              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                    Download Flutter Code (main.dart)
                  </h5>
                  <p className="text-[11px] text-slate-500">
                    Get the complete Flutter source code for Makran Fix
                  </p>
                </div>
                <button
                  onClick={downloadFlutterApkProject}
                  className="px-3.5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Code</span>
                </button>
              </div>

              {/* Method 2: PWABuilder Instant APK (No Code Needed) */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">
                    Method 2: PWABuilder (1-Click APK Generator)
                  </span>
                  <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    No Android Studio Needed
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Enter your app URL into <strong>pwabuilder.com</strong> and click <strong>"Package for Android"</strong> to download a signed APK directly!
                </p>
                <a
                  href="https://www.pwabuilder.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-purple-700 hover:underline pt-1"
                >
                  <span>Open PWABuilder APK Generator</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            Makran Lab · Amma Tower Saddar B-80
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
