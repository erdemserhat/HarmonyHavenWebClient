const defaultMD = 'OSI Modeli (Open System Interconnection Model)\n' +
    '==============================================\n' +
    '\n' +
    'Bu yazıda bilgisayar bilimlerinin en önemli konularından birisi olan OSI modeli ve global internetin nasıl çalıştığını konuşacağız. OSI Modeli temel olarak 2 bilgisayarın birbirleriyle nasıl iletişime geçtiğini açıklayan bir modelir. Konuya devam etmeden önce birkaç şey söylememde fayda var ; Bir bilgiyi gerçekten kullanabilmek ve bu bilgi ile değer katabilmek için onu içselleştirebilmek gerekiyor, birey tarafından içselleştirilebilen bilgi zamanı geldiğinde doğru yerde kullanılır ve bir problemin çözülmesi için bir basamak görevi görür, ama sadece öğrenilmiş bilgi sınavlarda başarı göstermemizi yada arkadaşlarımızla sohbet ederken bu bilgiye referans veren birkaç cümle söylememizden öteye gitmeyecektir. Bu yazıda OSI modelini içselleştirebilmeniz için gerekli büyük resmi görüp bir verinin (data) başka bir bilgisayara iletilmesi sürecini kronolojik bir sıra ile ele alacağız ve burdan yola çıkarak küresel internetin nasıl çalıştığını açıklayacağız, konuyu daha net anlamak için gerekirse bağlamdan ayrılıp başka şeyleri konuşacağız, günlük hayattan örnekler vereceğiz, analojiler kullanacağız.\n' +
    '\n' +
    'OSI Modeli neden var? neden böyle bir modele ihtiyaç duyuluyor?\n' +
    '---------------------------------------------------------------\n' +
    '\n' +
    '2 farklı işletim sistemine sahip bilgisayar düşünelim macOS ve Windows bu bilgisayarlar RJ45 konektörleri ile bir birbirlerinin NIC (Network Interface Controller/Card) kartına bağlı olsunlar.\n' +
    '\n' +
    '> NIC, RJ45 ve LAN Kablosu\n' +
    '> \n' +
    '> * Günlük hayatta bildiğiniz Cat5e, Cat6 gibi kablolar LAN (Local Area Network) kablosuna örnek verilebilir.\n' +
    '> \n' +
    '> * NIC (Network Interface Controller/Card) kartına ethernet veya wifi kartımız örnek verilebilir.\n' +
    '> \n' +
    '> * RJ45 bir konektör tipidir, NIC kartında dişi konektörü, LAN kablosuna ise erkek konektörü bulunur, aşağıdaki görseli inceleyebilirsiniz.\n' +
    '\n' +
    '![Farkı işletim sistemine sahip iki bilgisayarın basit bağlantısı](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*IeCXWAPbyvsgw_xDM4QFJw.png)\n' +
    '\n' +
    'Bildiğimiz üzere macOS ve Windows birbirinden çoğu konuda farklılaşmış işletim sistemleridir, ama veri iletişimi için ortak bir strateji izlemeliler ki sağlıklı bir iletişim mümkün olsun. sadece bu iki işletim sistemleri bağlamında değil bütün bilgisayarların veri iletimi gibi temel bir konuda bazı ortak kurallara uyması gerekir ki global olarak sağlıklı bir iletişim mümkün olsun. Bu ortak kurallar bütününü (OSI Modeli) 1984 yılında ISO, Uluslararası Standardizasyon Örgütü (International Organization for Standardization) ortaya atmıştır.\n' +
    '\n' +
    'OSI Modeli temel olarak 7 katmandan oluşmaktadır, her katman kendi içinde protokollere sahiptir, veri iletişimi sırasında ilgili veri bu katmanların tamamından her seferinde geçer. bu katmanlar Lx (x=1,2,3,4,5,6,7) şeklinde de bilinir örneğin L7 (Layer 7) katmanı Uygulama Katmanına (Application Layer) refere ederken L1 (Layer 1) Fiziksel Katmana (Physical Layer) refere eder.\n' +
    '\n' +
    '> **Protokol**, iki veya daha fazla cihaz veya sistemin birbirleriyle iletişim kurabilmesi için belirlenen kurallar, standartlar ve anlaşmaların tümüdür.\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*S06RPHHFtrr4vqGFOZoXXw.png)\n' +
    '\n' +
    'Uygulama Katmanı (Application Layer, L7)\n' +
    '========================================\n' +
    '\n' +
    'Günlük hayatta kullandığımız bilgisayarlarda internete ihtiyaç duyan yani başka bir dış kaynağa erişmesi gereken uygulamaların (istemci uygulaması) tamamı (Chrome, Facebook, Instagram Linkedln..) ilk önce Uygulama Katmanını (Application Layer) kullanır. Tabi her uygulama L7\'yi uygun protokoller ile kullanır.\n' +
    '\n' +
    '**Host ve Client Kavramları**\n' +
    '\n' +
    '> **Host**, bir ağda hizmet sunan veya hizmet alan bir cihaz veya sistemdir. Genel olarak, ağda veri ileten, alan veya depolayan cihazlara **host** denir. Bir host, IP adresiyle tanımlanır ve genellikle bilgisayarlar, sunucular, router’lar, ağ yazıcıları, telefonlar ve diğer ağ cihazları host olarak kabul edilir.\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*07OQYloE6t9xzNJQwEkTnQ.png)\n' +
    '\n' +
    '> İnternete bağlanması veya dış kaynaklarla iletişime geçmesi gereken uygulamalara **“client”** (istemci) denir. Bu tür uygulamalar, genellikle uzak sunuculardan veri alır, gönderir veya onlarla iletişim kurar. Bir istemci uygulama, genellikle internet üzerinden belirli bir hizmeti **kullanmak** amacıyla bağlantı kurar.\n' +
    '\n' +
    'Tabi her uygulama L7\'yi uygun protokoller ile kullanır dedik, bu protokollerden en yaygın olanlarını biraz konuşalım\n' +
    '\n' +
    '**HTTP/S (Hypertext Transfer Protocol / Secure)**\n' +
    '-------------------------------------------------\n' +
    '\n' +
    'HTTP, web sayfalarını tarayıcıya yüklemek için kullanılan protokoldür. Web tarayıcıları (örneğin Chrome, Firefox) ve web sunucuları arasında veri iletimi sağlar.\n' +
    '\n' +
    'HTTP, istemci (tarayıcı) ile sunucu arasındaki bağlantıyı kurarak istemcinin sunucudan veri (örneğin bir HTML sayfası) almasını sağlar. HTTP istekleri ve yanıtları açık metin olarak iletilir, yani veri şifrelenmez. HTTPS’ de ise veriler şifreli olarak iletilir. HTTP varsayılan olarak **80 numaralı port** üzerinden çalışır, HTTPS’ de ise **443 numaralı port** üzerinden çalışır, şuan bu yazıyı 443 numaralı port üzerinden HTTPS protokolü sayesinde okuyorsunuz :)\n' +
    '\n' +
    '> Günümüzde çoğu yazılım client ve server arasındaki iletişimi sağlamak için Rest API kullanır, Rest API ise HTTP/S protokolü üzerinden çalışan bir mimaridir.\n' +
    '\n' +
    'FTP (File Transfer Protocol)\n' +
    '----------------------------\n' +
    '\n' +
    'FTP (File Transfer Protocol), dosya transferi için kullanılan yaygın bir protokoldür. FTP protokolünü kullanan yazılımlar, genellikle dosya transferini kolaylaştıran ve kullanıcıların uzak sunuculara bağlanarak dosya yükleme, indirme veya yönetme işlemleri yapmalarını sağlar. FTP protokolü ise 21 numaralı portu çalışır. FileZilla en popüler FTP istemcilerinden biridir. WinSCP ise yine FTP Protokolü ile dosya aktarımı sağlar, WinSCP’yi uzak bilgisayarınız yada VPS’niz (Virtual Private Server) için dosya aktarım aracı olarak kullanabilirsiniz.\n' +
    '\n' +
    '![FileZilla sayesinde FTP (port 21) protokolü üzerinden doğrudan uzak sunucunuza dosya gönderebilirsiniz.](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*VpzON_XvFDRwVw3XiOVecw.png)\n' +
    '\n' +
    'SSH (Secure Shell)\n' +
    '------------------\n' +
    '\n' +
    'Genellikle uzak sunuculara güvenli bir şekilde bağlanmak için kullanılır. Dosya transferi, komut çalıştırma gibi işlemler yapılabilir. SSH protokolü ise 22 numaralı port üzerinden çalışır. Örneğin PuTTY SSH protokolünü kullanan uzak sunucularımızı komut satırı üzerinden kontrol etmemizi sağlayan bir uygulamadır, bende bu uygulamayı aktif olarak VPS/C üzerinde backend sunucularımı başlatmak ve çeşitli Firewall kuralları eklemek için sık olarak kullanmaktayım.\n' +
    '\n' +
    '![PuTTY ile SSH protokolü (port 22) üzerinden uzak sunucunuza erişim komut satırı üzerinden dilediğiniz işlemleri yapabilirsiniz.](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*1okyqBi_Soq1loQ8vVXmSg.png)\n' +
    '\n' +
    '> Telnet(Telecommunication Network) de SSH gibi sanal terminaldir fakat daha az güvenlidir bu yüzden genellikle SSH tercih edilir.\n' +
    '\n' +
    '**VNC** (Virtual Network Computing\n' +
    '----------------------------------\n' +
    '\n' +
    'Uzaktan masaüstü paylaşımı ve kontroü için kullanılır. VNC, uzak bir cihazın masaüstüne erişimi sağlar ve bu, genellikle bilgisayarlar arasında uzaktan kontrol için kullanılır.\n' +
    '\n' +
    '![RealVNC uygulaması VNC protokolünü kullanıp uzak sunucumuzun masaüstünü paylaşımını mümkün kılar.](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*4WsvdKXHp_EH5jsT.png)\n' +
    '\n' +
    'SMTP (Simple Mail Transfer Protocol)\n' +
    '------------------------------------\n' +
    '\n' +
    'SMTP (Simple Mail Transfer Protocol), e-posta gönderimi ve aktarımı için kullanılan bir protokoldür. OSI modelinde Uygulama Katmanı (L7)’nda çalışır. SMTP, e-postaların bir göndericiden bir alıcıya veya bir e-posta sunucusundan başka bir e-posta sunucusuna taşınmasını sağlar. Port 587 üzerinden çalışır. SMTP protokolünü kullanarak belirli işlemler gerçekleştiğinde otomatik olarak bir adrese mail gönderebilirsiniz, yazılım geliştiriyorsanız ve şifre unuttum özelliği üzerinde çalışıyorsanız muhtemelen SMTP protokolünü kullanacaksınız demektir.\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*ql3sI3Lai0PyR734.png)\n' +
    '\n' +
    '> POP (Post Office Protocol) ve IMAP (Internet Message Access Protocol), e-postaların alıcı tarafından bir posta sunucusundan alınması için kullanılan iki farklı protokoldür. Her ikisi de OSI modelinde Uygulama Katmanı (L7)’nda çalışır, ancak işleyiş ve kullanım amaçları farklıdır.\n' +
    '\n' +
    'Uygulama katmanında (L7) neler olduğunu kısaca özetleyelim, son kullanıcıya en yakın olan katman, internete ihtiyaç duyan yada başka bir bilgisayara veri göndermek isteyen bir istemci uygulama ilk önce L7\'de uygun protokolü kullanıyor. gönderilmek istenen veri bu katmanda insan tarafından okunabilir formattadır (HTML, JSON XML.. formatlarında).\n' +
    '\n' +
    'Sunum Katmanı (Presentation Layer, L6)\n' +
    '======================================\n' +
    '\n' +
    'Uygulama Katmanından gelen veriler sunum katmanına iletilir, sunum katmanına ulaşan data alfanümerik (rakam ve harflerden oluşan) formattadır, ancak bu format tahmin edersiniz ki bilgisayar bilimleri için pek optimum bir format değildir, donanım veya protokol düzeyinde çalışırken bit düzeyi bize hız kazandırır bu yüzden ilk önce bu alfanümerik formattaki data bitlerine ayılır(1 ve 0\'lara).\n' +
    '\n' +
    '> **Alfanümerik** formattaki veri genellikle **ASCII**, **UTF-8**, veya başka bir **karakter kodlama standardına** göre bitlerine ayrılır. Bu süreç, verinin karakterlerin sayısal bir temsiline dönüştürülmesi ve ardından bu sayısal temsilin ikili (binary) formatına çevrilmesiyle gerçekleşir.\n' +
    '\n' +
    '![Uygulama katmanından gelen alfanümerik datanın bitlerine ayrılması işlemi](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*AG_S2pj350gEae0iM0hkBg.png)\n' +
    '\n' +
    'Bitlerine ayrılan data üzerinde, ardından sıkıştırma (compression) işlemi gerçekleştirilir, bu sıkıştırma işlemi sonucunda verinin boyutunda azalma olmak zorunda değildir, iletişimi optimize etmek için bir adımdır zira sıkıştırma işlemi sonucunda datanın boyutu düşer ve iletişim hızlı gerçekleşir. ardından sıkıştırılan data şifrelenerek hassas verilerin güvenliği sağlanır diğer yandan alıcı tarafında ise bu işlemler tersinir şekilde gerçekleşecektir, yani alıcı da şifreyi çözer, ardından sıkıştırılmış datanın dekompresyonu (sıkıştırılan datayı orijinal haline getirmek) gerçekleşir sonrasında bitlerine ayrılmış data tekrar alfanümerik forma dönüştürülür ve okunabilir formatta uygulama katmanına gönderilir.\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*iZaQgPZWRnJ0aoHWunI8ug.png)\n' +
    '\n' +
    'Sunum katmanında 3 temel işlev gerçekleşir ; bitlerine ayırma , sıkıştırma ve şifreleme.\n' +
    '\n' +
    'Ardından şifreli formattaki verimiz Oturum Katmanına yönlendirilir.\n' +
    '\n' +
    'Oturum Katmanı (Session Layer, L5)\n' +
    '==================================\n' +
    '\n' +
    'Oturum katmanı çoğu durumda görevi pek anlaşılamayan ve doğru anlaşılamadığı içinde haliyle kolayca görevi unutulan bir katmandır bu yüzden teknik tanımdan ziyade bir analoji ile bu başlığa giriş yapacağız.\n' +
    '\n' +
    'Düşünün ki, iki kişi arasında bir telefon görüşmesi yapılıyor. Telefon görüşmesi sırasında, her iki tarafın da konuşmaları düzgün bir şekilde yapabilmesi, görüşmenin başlatılması, devam ettirilmesi ve bitirilmesi gerekiyor. Bu gereksinimler düşünüldüğünde aşağıdaki başlıkları inceleyecek olursak;\n' +
    '\n' +
    '1- Oturum Başlatma (Session Establishment)\n' +
    '\n' +
    '*   Telefon görüşmesi başlamadan önce (veri iletimi başlamadan önce), her iki kişi de birbirini arar ve görüşmenin başlatılması için telefon açılır (oturum). Bu, **Session Layer**’ın **oturum kurma** işlevine benzer. İki tarafın da birbirine bağlanması sağlanır.\n' +
    '\n' +
    '2- Oturum Yönetimi\n' +
    '\n' +
    '*   Telefon görüşmesi sırasında, konuşmalar düzenli bir şekilde ilerler. Biri konuşurken, diğeri dinler (biri veri gönderirken diğeri veriyi alır). Bu aşamada, bir tarafın konuşma sırası geldiğinde, diğeri sessiz kalır ve bu sırayı bozmamaya dikkat eder. **Session Layer**, verilerin doğru sırayla ve düzgün bir şekilde iletilmesini sağlar, tıpkı telefon görüşmesindeki sırayla konuşma gibi.\n' +
    '\n' +
    '3- Oturum Sonlandırma (Session Termination)\n' +
    '\n' +
    '*   Telefon görüşmesinin sonunda, her iki taraf da görüşmeyi sonlandırmak ister. Herhangi bir kişi, görüşmeyi sonlandırmak için telefonu kapatır. **Session Layer**, oturumun düzgün bir şekilde kapanmasını sağlar ve bağlantı sonlandırılır.\n' +
    '\n' +
    '4- Senkronizasyon ve Hata Yönetimi\n' +
    '\n' +
    'Eğer telefon görüşmesinde aniden bir kesinti olursa, örneğin birinin telefonu düşerse, görüşme tekrar senkronize edilmek üzere devam ettirilir. örneğin nasıl ki telefonlarımız çekmediği zaman birden görüşme sonlanmıyor konumumuzu değiştirdiğimizde bağlantı tekrar sağlanıyorsa, **Session Layer**’da da benzer şekilde, veri iletimi sırasında oluşabilecek sorunları yönetmek için kontrol noktaları oluşturulabilir ve kesintilerden sonra veri iletimi kaldığı yerden devam edebilir. Taraflardan birisi uzun süre diğerine cevap vermezse görüşmeyi diğer tarafın sonlandırması gerekir bu durum da yine benzer şekilde Session Layer tarafından yönetilir session’da istemciden uzun süre yanıt gelmezse oturum sonlandırılır.\n' +
    '\n' +
    'Telefonu açıp, düzenli bir konuşma yapmayı ve görüşmeyi sonlandırmayı nasıl yönettiğimiz gibi, **Session Layer** da ağ üzerinden iletişimin düzenli ve sürekliliğini sağlayan katmandır.\n' +
    '\n' +
    'Bu analojinin ardında adettendir teknik bir tanım da yapalım. Oturum Katmanı L5, verinin iletiminde bağlantı sürekliliğini sağlayan ve iki uygulama arasındaki iletişimi düzenleyen katmandır. Bu katman, oturumların yönetilmesi, kurulması ve sonlandırılması gibi görevleri üstlenir ve veri akışının düzenli bir şekilde gerçekleşmesini sağlar. aynı zamanda sunumun katmanından gelen verilere de oturumla ilgili meta veriler (metada) ekler.\n' +
    '\n' +
    '> Oturum (session) ile ilgili metadata, bir kullanıcının bir sistem veya uygulama ile etkileşime geçtiği süre boyunca oluşturulan, saklanan ve kullanılan bilgilerdir. Bu metadata, oturumun durumu, güvenliği, süresi ve kullanıcı etkileşimleri gibi bilgileri içerebilir. Örneğin oturum kimliği (Session ID), oturumun başlangıç ve bitiş zamanı, ip adresi..\n' +
    '> \n' +
    '> Ç_oğu kaynakta authorization & authentication işlemlerinin oturum katmanında yönetildiği yazmaktadır, ancak bu tartışmalı bir konudur, zira artık token bazlı yetkilendirme (JWT) ile çoğu modern yazılım Uygulama Katmanında authorization & authentication işlemlerini yönetmektedir, bu genel geçer bir kuraldan ziyade spesifik bir sistem üzerinde yanıtlanması gereken bir sorudur. Diğer yandan OSI Modelinin teorik bir model olduğunu belirtmekte fayda var pratikte her proje global kuralları koruyarak kendi iletişim mimarisini özelleştirebilir, örneğin authentication & authorization işleminin Uygulama Katmanında veya Sunum Katmanında yapılması nihai iletişimi etkilemeyecek bir meseledir._\n' +
    '\n' +
    'Taşıma katmanına geçmeden önce neler yaptığımızı çok kısaca hatırlayalım, uygulama katmanından gelen veri sunum katmanında bitlerine ayrıldı, sıkıştırıldı ve şifrelendi ardından oturumumuz kuruldu, Oturum katmanı verimize oturumla ilgili bazı meta veriler ekleni ve bu veriyi taşıma katmanına gönderdi.\n' +
    '\n' +
    'Taşıma Katmanı (Transport Layer, L4)\n' +
    '====================================\n' +
    '\n' +
    '**Transport Layer** (Taşıma Katmanı), V**eri iletimi** ve **iletişim güvenliği** için sorumludur. Bu katman, iki cihaz arasında veri iletiminin güvenli ve hatasız bir şekilde gerçekleşmesini 3 temel fonksiyonellik ile sağlar\n' +
    '\n' +
    '1- Segmentasyon (Segmentation)\n' +
    '------------------------------\n' +
    '\n' +
    'Segmentasyon işlemi iletilecek verilerin birimlere ayrılması işlemidir, nihayetinde iletilecek veri çok büyük olabilir ve bunu tek seferde göndermek çok uzun sürebilir, zira böyle olsaydı örneğin, bir video akışı (Netflix gibi) sırasında, video dosyasının tamamını bir seferde iletmek çok uzun sürebilirdi. Bunun yerine, video verisi küçük segmentlere (paketlere) ayrılır ve her bir parça ağ üzerinden gönderilir. Bu sayede, medya oynatıcısı, video dosyasının tamamını alana kadar beklemek yerine, hemen ilk birkaç segmenti alıp oynatmaya başlayabilir. Geriye kalan veriler de arka planda alınır.\n' +
    '\n' +
    'Segmentasyon işleminde Oturum Katmanından alınan veriler, veri birimlerine ayrılır, Taşıma katmanındaki veri birimlerine segment denir.\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:682/format:webp/1*VPCZiP7f8w1jLMrYdXOXLw.png)\n' +
    '\n' +
    'Ve elbette her segment kendi içerisinde belli başlı veriler bulundurur bu veriler sıra numarası (sequence number) ,hedef port numarası ve kaynak port numarasıdır. hedef ve kaynak port numarasını anlamak için aşağıdaki bilgiyi öğrenmemiz gerekecek konunun dağıldığınızı düşünmeyin bu yazıyı okumayı bitirdiğinizde herşeyin biribiri ile alakasını anlamış olacaksınız.\n' +
    '\n' +
    'Bu bölümü biraz detaylandıralım ve somut örnekler verelim. internete erişmek istediğimizde veya bir dış kaynağa bir veri almak istediğimizde biz istemci durumunda oluruz, serverin ip adresini ve portunu kullanarak ilgili veriyi alırız. bu tanım aşina olduğumuz bir tanımdır, ve bu tanım uzun süre akılda kalması durumunda sadece “server’lar port açar istemciler bu açılan portu kullanır ve kendileri port açmaz” gibi bir bilinçaltı tanımını da beraberinde getirir.\n' +
    'Sanılanın aksine iki cihazın istemci veya sunucu farketmeksizin iletişime geçmesi için bir port kullanması gerekir. Ne demek istiyoruz ?\n' +
    '\n' +
    'Burada portlar ve bağlantılar arasındaki farkları anlamak için şu unsurlara dikkat etmeliyiz ;\n' +
    '\n' +
    '**A- Sunucu Portu (Server Port)**\n' +
    '---------------------------------\n' +
    '\n' +
    '*   Sunucu, dışarıdan gelen bağlantıları kabul etmek için **önceden belirlenmiş** bir portu dinler. Bu portlar genellikle **iyi bilinen portlar** (well-known ports) olarak adlandırılır ve belirli hizmetler için ayrılmıştır. Örneğin:\n' +
    '*   HTTP için **port 80**\n' +
    '*   HTTPS için **port 443**\n' +
    '*   FTP için **port 21**\n' +
    '*   SMTP için **port 25**\n' +
    '*   Sunucu, bu portları **dinler** ve istemciler bu portlara bağlanarak sunucudan veri alabilir veya sunucuya veri gönderebilir.\n' +
    '\n' +
    '**B- İstemci Portu (Client Port)**:\n' +
    '-----------------------------------\n' +
    '\n' +
    '*   İstemci tarafında ise port numarası genellikle **dinamik** olarak atanır. İstemci uygulamaları (örneğin bir tarayıcı, FTP istemcisi vb.) sunucuya bağlanırken kendi geçici portunu (dinamik port) kullanır.\n' +
    '*   Bu portlar genellikle 1024 ile 65535 arasında bir aralıktan rastgele seçilir. Bu tür portlar **ephemeral portlar** olarak adlandırılır.\n' +
    '*   İstemcinin bu geçici portu kullanmasının sebebi, **aynı anda birden fazla sunucuya bağlanabilmek ve her bağlantıyı ayrı bir port üzerinden yönlendirebilmektir.**\n' +
    '\n' +
    'C- Bağlantı Kurma Süreci\n' +
    '------------------------\n' +
    '\n' +
    '*   **Sunucu** dışarıdan gelen bağlantıları kabul etmek için belirli portları dinler.\n' +
    '*   **İstemci** ise bu portlara bağlanır ve kendi geçici portunu kullanarak bağlantıyı başlatır.\n' +
    '\n' +
    'Örnek olarak, bir web sayfasına bağlanmak için:\n' +
    '\n' +
    '*   İstemci (tarayıcı) **port 80 veya 443** (HTTP/HTTPS) üzerinden sunucuya bağlanır.\n' +
    '*   İstemci, kendi **geçici portunu** kullanarak bağlantıyı başlatır (örneğin 49152). Bu port sunucuya yapılan bağlantıda **istemcinin kaynak portu olur.**\n' +
    '*   Sunucu, istemciden gelen bağlantıyı kabul etmek için **port 80** veya **port 443**\'ü dinler.\n' +
    '\n' +
    'D - **Outbound vs Inbound**:\n' +
    '----------------------------\n' +
    '\n' +
    '*   **Outbound** bağlantılar: İstemci, dışarıya doğru bir bağlantı başlatır ve bu bağlantı için bir port seçer (örneğin bir tarayıcıdan bir web sayfasına erişim).\n' +
    '*   **Inbound** bağlantılar: Sunucu, dışarıdan gelen bağlantıları kabul etmek için belirli bir portu dinler (örneğin HTTP portu 80).\n' +
    '\n' +
    '**Ancak**, sunucular da istemci gibi **dışarıya bağlantı yaparken** bir port kullanırlar. Örneğin, bir web sunucusu veritabanına bağlanırken, dışarıya (outbound) doğru bağlantı kurar ve bu bağlantı için sunucu da **dinamik bir port** kullanır.\n' +
    '\n' +
    'E- **Portların Rolü ve Farklar**\n' +
    '--------------------------------\n' +
    '\n' +
    '*   Sunucular genellikle **statik portlar** kullanır (80, 443 gibi), çünkü dış dünyadan gelen bağlantıları **beklerler**.\n' +
    '*   İstemciler ise **dinamik portlar** kullanır, çünkü onlar **bağlantı başlatan taraftır** ve **aynı anda farklı bağlantılar yapabilmek için geçici portlar kullanırlar.**\n' +
    '\n' +
    'Bu şekilde, **“server’lar port açar, istemciler bu portu kullanır”** ifadesi kısmen doğru olsa da, istemcilerin de dışarıya bağlanırken kendi **geçici portlarını** kullandığını unutmamak gerekir.\n' +
    '\n' +
    'Ve segmentlerde tutulan hedef ve kaynak port numaraları serverin statik portu ve istemcinin epheremal (geçici) portudur. istemci tarafındaki geçiçi port numaraları bu isteğin hangi uygulama tarafından yapıldığının tanımlayıcısıdır aşağıdaki görsele göz atalım\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1274/format:webp/1*Wt_Lj5-45rypQ9dKn1bAwA.png)\n' +
    '\n' +
    'Bu görselde segmentlerdeki epheremal portlar hangi uygulamaya hangi segmentin ait olduğunu gösterir. örneğin telefonunuzda whatsapp uygulamasını açtığınızda çalışma zamanında rastgelen seçilen bir x portu ile whatsapp serverine isteğiniz iletilir whatsap isteğinizin yanıtını verirken taşıma katmanında sizin isteğinizle ilgili olan segmentlerde hedef portu olarak x olarak belirtir sizin uygulama katmanınıza data ulaştığında bu isteğin hangi port üzerinden yapıldığına bakılarak, veri ilgili uygulamaya yönlendirilir.\n' +
    '\n' +
    'Peki ya sequence number (sıra numrası) ne işe yarar?, taşıma katmanı verileri segmentlere ayırırken belirli bir mantığa göre ayırır ki sonrasında bu segmentler birleşerek tekrar aynı anlamlı datayı oluşturabilsin, bu birleştirmenin (reassembly) doğru bir şekilde yapılabilmesi için her segmente sıra numrası verilir.\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1352/format:webp/1*jr9pM3EziAtSHEZ6jG_GLA.png)\n' +
    '\n' +
    'Verinin gönderildiğini değil de alındığını düşünürsek Taşıma Katmanında veriler tekrar birleştirilip ilgili port (bu durumda epheremal port) numarasını dinleyen uygulamaya verilir.\n' +
    '\n' +
    'Taşıma Katmanın (Transport Layer , L4) 3 temel fonksiyonelliği vardır dedik Segmentasyonu konuştuk şimdik gelelim 2. fonksiyonelliğe…\n' +
    '\n' +
    '2- Akış Kontrolü (Flow Control)\n' +
    '-------------------------------\n' +
    '\n' +
    'Flow control (akış kontrolü) temel olarak veri iletişiminin gerçekleştiği cihazlar arasındaki hız farklarını denetler ve iletim hızının tarafların kapasitelerine göre uyarlanmasını sağlar. Bu, ağdaki veri iletimini daha verimli hale getirmek için önemli bir mekanizmadır.\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*pV1PqpnxgZr4PX84OTzM_A.png)\n' +
    '\n' +
    '**Veri İletim Hızının Denetimi**\n' +
    'Diyelim ki sunucumuz maksimum 100Mbps (saniyede 100mb) ile veri gönderebiliyor mobil cihazımız ise maksimum 10Mbps ile alabiliyor, mobil cihazımızdan sunucudan bir dosya indirme talebinde bulunduk ve sunucu bize 50Mbps ile göndermeye başladı. Bu durumda mobil cihazımız Transport Layer aracılığı ile maksimumum bant genişliğini sunucuya bildirir, iki taraf için de optimum hız bulunmuş olur.\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*hIy-n0nY-7jUAMWYp4QM3A.png)\n' +
    '\n' +
    'aynı senaryo tersinir şekilde de gerçekleşebilirdi örneğin server 5mbps ile göndermeye başlasaydı mobil cihaz bu durumda Transport Layer aracılığı ile hızı yükseltmesi gerektiğini bildirecekti.\n' +
    '\n' +
    'Flow Control’ün Çalışma Şekli\n' +
    '\n' +
    '*   **TCP** (Transmission Control Protocol) gibi protokoller, flow control için **pencereleme (windowing)** mekanizmasını kullanır. Bu mekanizma, bir tarafın (genellikle istemcinin) ne kadar veri alabileceğini belirler ve bu bilgiyi gönderen tarafa (sunucuya) bildirir. Örneğin, istemci belirli bir miktar veri aldıktan sonra bir onay (ACK) gönderir ve bu onay ile birlikte alabileceği veri miktarı hakkında bilgi verir. Eğer istemcinin kapasitesi dolmuşsa, sunucu veri gönderimini durdurur veya hızını azaltır.\n' +
    '*   **Sliding Window** prensibi, veri gönderimi sırasında istemcinin mevcut kapasitesine göre bir pencereyi hareket ettirir. Eğer istemci daha fazla veri almak için hazırsa, pencere genişler ve sunucu daha fazla veri gönderir.\n' +
    '\n' +
    '![Sliding Windows Prensibinde ACK (anlaşma) alındığı sürece gönderilen frame sayısı artırılır ne zaman ki ACK alınmaz o zaman bir önceki duruma geri dönülür bu şekilde sistem bant genişliğini iki taraf içinde optimum seviyede tutar](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*xhwzPkeYws3CaiafD0cJ-Q.png)\n' +
    '\n' +
    'Taşıma Katmanın (Transport Layer , L4) 3. temel fonksiyonelliğine geldik.\n' +
    '\n' +
    '3- Hata Kontrolü (Error Control)\n' +
    '--------------------------------\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ygOVmVKyuqg0GFv8Et5_uA.png)\n' +
    '\n' +
    'Aktarım sırasında verinin eksik, bozuk veya yanlış şekilde iletilmesi durumunda bu hatayı tespit edip düzeltmek transport layer’ın önemli bir görevidir. Eğer bir segment (data unit) hedefe ulaşamazsa veya bozuk şekilde ulaşırsa, **transport layer** bunu fark eder ve eksik ya da bozuk segmentin yeniden gönderilmesini sağlar bu işleme Otomatik Tamamlama İsteği, (Automatic Repeat Request, ARQ) denir.\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*1gBxCW_VQuQMrM6OI0lxfA.png)\n' +
    '\n' +
    'Hangi segmentlerin bozuk olduğu ise Checksum yaklaşımı ile belirlenir ;\n' +
    '**Checksum**: segmentin sonunda eklenen bir grup bitlik bir kontrol bilgisidir. verinin doğru bir şekilde alınıp alınmadığını doğrulamak için kullanılır. Gönderici, verinin içeriğine dayalı bir matematiksel işlem yaparak checksum değerini üretir ve bunu segmentin sonuna ekler. Alıcı taraf, veriyi aldığında aynı işlemi tekrarlar (tıpkı hash değeri gibi düşünülebilir bildiğiniz üzere hash değerleri de verilerin bütünlüğünü kontrol etmek amacıyla kullanılıyor).\n' +
    '\n' +
    '![Checsum değerleri datanın bütünlüğünü kontrol etmek için segmentin sonuna eklenir.](https://miro.medium.com/v2/resize:fit:1004/format:webp/0*gvy3ZHW3CpEMd9wA.png)\n' +
    '\n' +
    'Eğer alıcının hesapladığı checksum ile gönderilen checksum eşleşiyorsa veri doğru şekilde iletilmiştir. Eğer eşleşmezse, hata olduğu anlaşılır ve yeniden gönderim (ARQ) talep edilir.\n' +
    '\n' +
    'Taşıma Katmanı (Transport Layer, L4) görevini 3 temel fonksiyonellik ile sağlar dedik. Segmentasyon, Akış Kontrolü ve Hata Kontrolü, bunların 3\'ünüde konuştuk, şimdik taşıma katmanında kullanılan 2 temel yaklaşımı konuşalım.\n' +
    '\n' +
    '1. Connection-Oriented Transmission Approach (Bağlantı Odaklı İletişim Yaklaşımı)\n' +
    '----------------------------------------------------------------------------------\n' +
    '\n' +
    'Bu yaklaşım TCP (Transmission Control Protocol) kullanılarak gerçekleştirilir, veri transferinin gerçekleşmesi için 2 cihaz arasında (server-client) bir bağlantının olarak kurulması gerekir, Bu genellikle 3-Way Handshake ile gerçekleşir.\n' +
    '\n' +
    '3-Way Handshake (3-Aşamalı Anlaşma) Aşağıdaki Sürecileri İçerir\n' +
    '\n' +
    '*   İstemci → Sunucu: **SYN** (İstemci sunucuya bağlantı isteği gönderir.)\n' +
    '*   Sunucu → İstemci: **SYN-ACK** (Sunucu, istemcinin bağlantı teklifini kabul eder, ve kendi bağlantı isteğini gönderir)\n' +
    '*   İstemci → Sunucu: **ACK** (istemci’de sunucunun bağlantı isteğini kabul eder)\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*2KXZSUV6OqpywQSBGQ6aiw.png)\n' +
    '\n' +
    'Bu yaklaşımda gönderilen her veri paketi (segment) alıcı tarafından onaylanır, segment eksikse veya checksum değerleri eşleşmiyorsa yani bozulmuşsa, yeniden gönderilir, bu yaklaşı genelde hassas veri transferi gereken durumlarda kullanılır örneğin\n' +
    '\n' +
    '*   Web Tarayıcıları (HTTP/S); Çünkü web tarayıcımıza bazı segmentler eksik gelirse web sayfasını düzgün görüntüleyemeyebiliriz.\n' +
    '*   E-Posta Servisler (SMTP,IMAP,POP3); Maillerimizin eksik gitmesini istemeyiz diye düşünüyorum :)\n' +
    '*   Dosya Transferi (FTP): Dosyalarımızda da eksik segment olması durumunda düzgün çalışmayacaktır\n' +
    '\n' +
    'Şimdi şöyle bir düşünce aklımıza gelmiş olabilir, herşeyin eksiksiz olması herzaman iyi değil midir kim eksik segment ister ki? hep bu yaklaşımı kullanalım madem diyor olabiliriz, ama bu yaklaşımın bazı durumlarda dezavatanjları var.\n' +
    'Her seferinde segmentin doğru iletilip iletilmediğini kontrol ediyoruz, hata kontrolü yapıyoruz bu veri iletişimini yavaşlatıyor ve bazı durumlarda her segmentin birebir iletilmesinden ziyade hız ve senkronizasyon daha ön planda olabilir. bu tarz dezavatanjlar yüzünden aşağıdaki yaklaşım ortaya çıkmıştır.\n' +
    '\n' +
    '2. Connectionless Transmission Approach(Bağlantısız İletim Yaklaşımı)\n' +
    '----------------------------------------------------------------------\n' +
    '\n' +
    'Bu yaklaşımda UDP (User Datagram Protocol) kullanılarak gerçekleştirilir. Veri paketleri (segmentler) doğrudan gönderilir, paketlerin client tarafından alınıp alınmadığı kontrol edilmez, hata kontrolü yapılmaz, ve tahmin edersiniz ki Bağlantı Odaklı Yaklaşıma göre daha hızlıdır. Peki ama bu yaklaşımı nerelerde kullanırız ;\n' +
    '\n' +
    '*   **Çevrimiçi oyunlar:** MMORPG (online çok oyunculu oyunlar), oyunlar oynarken bazen oyuncuların yerinin birden değiştiğini gömüşsünüzdür;\n' +
    '\n' +
    'Bir oyuncu yürürken veya koşarken, bir anda başka bir noktada belirir. Bu, istemci ile sunucu arasındaki veri paketlerinden bazılarının kaybolmasından veya gecikmesinden kaynaklanır. UDP kullanıldığında kaybolan paketler tekrar gönderilmez; bu yüzden oyuncunun hareketi aniden güncellenir, çünkü bu noktada oyun gerçek zamanlı olduğu için geçmişteki bir veri paketini göndermenin bir anlamı olmayacaktır.\n' +
    '\n' +
    '*   **Canlı yayın,** Ses ve video akışı (VoIP, IPTV):\n' +
    '\n' +
    'Bir sesli arama sırasında, konuştuğunuz kişinin bazı kelimelerinin “kaybolduğunu” ya da konuşmanın aniden “hızlandığını” fark edebilirsiniz.\n' +
    'Bu durumda UDP ile gönderilen ses paketlerinden bazıları bağlantı hızından dolayı ağ üzerindekaybolması veya hatalı gönderilmesidir. UDP yeniden gönderim yapmadığı için bu kayıp, sesin eksik duyulmasına neden olur, bundan sonra telefonda konuşurken birisinin sesini eksik duyduğumuzda “sanırım Transport Layer, UDP protokolünü kullandığı sırada ses segmentlerinin bazılarını eksik veya hatalı gönderdi rica etsem bu segmentleri tekrar gönderir misiniz gibi bir cevap verebiliriz..”\n' +
    '\n' +
    'Toplamak gerekirse Taşıma Kamanında kullanılan 2 yaklaşımında kullanım senaryoları değişiklik gösterir, ama artık biz hangi senaryoda neyi kullanacağımızı biliyoruz.\n' +
    '\n' +
    '> Hatırlatmak istiyorum ki, ingilizce ileti ve iletişim kavramları için network bağlamında “Transmission” anahtar kelimesi kullanılmaktadır, fakat ileti ve iletişim birbirinden farkı sözcüklerdir, mesajın karşı taraf tarafından anlaşıldığına eminseniz **iletişim** kuruyorsunuz demektir, ama emin değilseniz bu iletişim değildir karşı tarafa sadece bir **ileti** göndermişsiniz demektir.\n' +
    '> \n' +
    '> Bu yüzden “Connectionless Transmission Approach” Türkçeye “Bağlantısız **İletim** Yaklaşımı” diye çevrilirken “Connection-Oriented Transmission Approach” Türkçeye “Bağlantı Odaklı **İletişim** Yaklaşımı” olarak çevrilmektedir, başlıklardaki bu farkı fark etmiş miydiniz ? :)\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*lnsTNAUPTZiXP1-f57OCkQ.png)\n' +
    '\n' +
    'Taşıma katmanında neler olup bittiğini detaylı bir şekilde konuştuk kısaca özetlemek gerekirse taşıma katmanından bahsettiğimizde aklımıza aşağıdaki işlemler gelmeli\n' +
    '\n' +
    '*   Segmentasyon\n' +
    '*   Akış Kontrolü\n' +
    '*   Hata Kontrolü\n' +
    '*   Bağlantı Odaklı İletişim Yaklaşımı (TCP ile)\n' +
    '*   Bağlantısız İletim Yaklaşımı (UDP ile)\n' +
    '\n' +
    'Taşıma katmanında segmente edilen, checksum değerleri eklenen veri paketleri ardından Ağ Katmanına (Network Layer, L3) gönderilir.\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:812/format:webp/1*WLx3W7qZwllmAZyAiP3jPg.png)\n' +
    '\n' +
    'Ağ Katmanı (Network Layer, L3)\n' +
    '==============================\n' +
    '\n' +
    'Ağ katamanını konuşurken çok eğleneceğinize eminim, ve bu katmanı anlamamız için bazı terimler öğrenmemiz gerecek bu terimleri içselleştirmeden bu katmanın görevini sağlıklı bir şekilde anlamak mümkün olmayacaktır ama merak etmeyin hepsini çok detaylı bir şekilde konuşacağız.\n' +
    '\n' +
    '> Katmanlardaki veri birimini ifade ederken uygulama, sunum ve oturum katmanlarında “data” diye tanımladık taşıma katmanında ise dataların segmentasyonize edilip “segment” haline geldiğini söyledik.\n' +
    '> PDU (Protocol Data Unit), bir iletişim protokolü üzerinden iletilen veri birimini ifade eder. yani birisi size PDU birimini verdiyse hangi katmanda olduğumuzu anlayabiliz.\n' +
    '> Ağ Katmanında kullandığımız PDU birimi “Packet (Paket)” olarak isimlendirilir, yani burdaki data birimimiz paket, birisi bize OSI bağlamında konuşurken PDU birimlerini verirse direkt hangi katmanda olduğumuzu anlayabiliriz. (örn; PDU’yu “data” olarak referans veren bir uyarı alıyorsanız uygulama, sunum veya oturum katmanındasınız demektir.)\n' +
    '\n' +
    '![komut satırınızda herhangi bir adrese ping gönderdiğimizde yanıtların PDU birimi görüldüğü üzere “Packet” olarak karşımıza çıkar, bize ağ katmanı bağlamında bir cevap verildiğini artık anlıyoruz :)](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*vTmpUJ5YG8d7fs18NlgoiQ.png)\n' +
    '\n' +
    'Ağ Katmanı, Taşıma Katamanından gelen segmentleri farklı ağlardaki bilgisayarlar arasında iletir, Ağ katmanındaki data birimlerini paket olarak isimlendiririz, burası temel olarak router (yönlendirici)’ların (olduğu katmandır.\n' +
    '\n' +
    'Devam etmeden önce router’ların nasıl çalıştığını kısaca bir hatırlayalım;\n' +
    '\n' +
    'Router’lar Nasıl Çalışır?\n' +
    '-------------------------\n' +
    '\n' +
    'Evlerimizdeki internete bağlanmak için kullandığımız modemleri düşünelim, bu modemlere kablolu veya kablosuz olarak bağlanırız, ardından internete erişimimiz sağlanır. Modemimiz güzel bir router örneğidir biraz detaylandıralım ;\n' +
    '\n' +
    'Private IP Adress (Özel IP Adresi): Modemimiz bize local ağımızda benzersiz bir kimlik atamak için özel bir ip adresi verir, bu ip adresi sadece bizim yerel ağımıza özeldir, yerel ağa bağlı cihazlar arasında veri iletişimi için kullanılabilir, lakin sadece bu bilgi ile yerel ağımızda olmayan dış ağdaki (örneğin internetteki) bir cihaz bize herhangi bir veri gönderemez.\n' +
    '\n' +
    'Public IP Adress (Genel IP Adresi): Modemimiz internete bağlanmak için bu IP adresini kullanır, bu IP adresi bize ISP’miz (Internet Servis Sağlayıcısı, Internet Service Provider, örneğin; Türk Telekom, Türkcell) tarafından sağlanan ve internetteki bütün cihazlar tarafından tanınan IP adresidir.\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*QYGIlpTa7MkIaoUQ07n4OA.png)\n' +
    '\n' +
    'Yukardaki görüldüğü üzere router bize private ip adresileri tanımlasa da internete çıkış için kullandığımız ip adresi aynıdır bu durumda router’imiz bir gateway(geçit) görevi görür yani hangi hostu (pc, tablet, telefon) kullandığımız fark etmeksizin bütün isteklerimiz tek bir noktadan gönderilecektir.\n' +
    '\n' +
    'Peki Ama Router Hangi Paketin Hangi Hosta İletileceğini Nasıl Anlar?\n' +
    '\n' +
    'NAT (Network Adress Translation)\n' +
    '--------------------------------\n' +
    '\n' +
    'Router hangi paketin hangi hosta ait olduğunu basit olarak bir tablo yaparak anlar ne demek istiyoruz? hemen bir örnek verelim örneğin bu yazıyı sizler okurken router’iniz neler yaptı?\n' +
    '\n' +
    'Local IP Adresiniz 192.168.1.20 olsun tarayıcınız (Chrome, Firefox..) bu sayfayı talep etmek için bir ephemeral (geçici) port kullanır bu porta 3212 diyelim (kullandığınız hostun işletim sistemi bu portu dinamik olarak atar).\n' +
    'Router’e (Bu durumda modeminize,veya hücresel veri kullanıyorsanız internet servis sağlayıcısının sizin için sağladığı sanal router’a) bir istek gönderir. isteğin detayları şu şekildedir.\n' +
    '\n' +
    'Router’a Host’dan Gelen İsteğin Detayları:\n' +
    '\n' +
    '_Kaynak IP Adresi :192.168.1.20\n' +
    'Port Numrası: 3212 (Ephemeral Port, Tarayıcınıza Geçiçi Atanmış Port)\n' +
    'Hedef IP Adresi : 212.182.122.3 (erdemserhat.com)\n' +
    'Hedef Port :443 (HTTPS)_\n' +
    '\n' +
    'Router bu isteği alır ve NAT (Network Adress Tranlation) tablosuna kaydeder. Bunu public ip adresiniz ve ephemeral port ile ilişkilendirir.\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*2lPpgaDhr9VC5q2YwOcMrw.png)\n' +
    '\n' +
    'İstek ilgili hedefe Public IP adresiniz ile iletilir, hedef servis bu isteğin yanıtını yine Public IP adresinize yönlendirir, isteğin yanıtı router’a ulaştığında router NAT Tablosuna herhangi bir hostun böyle bir istek yapıp yapmadığını kayıtlara bakarak konrol eder eğer böyle bir kayıt varsa ilgili yanıtı kayıt detaylarındaki hosta tekrar yönlendirir.\n' +
    '\n' +
    'Burda dikkat edersek hostumuz tarafından belirlenen ephemeral port sabit kaldı çünkü NAT işlemdinde sadece private ip adresi public ip adresine dönüştürülür hostun belirlediği ephemeral port public ip adresi tarafından doğrudan kullanılır, akıllarda şu soru olabilir ya router’a birden fazla cihaz bağlıysa ve bunlar aynı ephemeral portu o anda kullanarak aynı adrese istek gönderdilerse?\n' +
    'Çünkü bahsettğimiz üzere hostumuz ephemeral portu işletim sisteminin o an olan durumuna göre boş portlardan birisini atar yerel ağda herhangi bir cihaz bu portu kullanıyor mu diye kontrol etmez. yani aşağıdaki durumun oluşması için teorik olarak bir olasılık söz konusu ;\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*z_51CRwnBtOdkCOGzW-4hA.png)\n' +
    '\n' +
    'Bu olasılığın gerçekleşmesi birkaç host olduğunda teorik olarak çok düşük bir ihtimal olsa da yerel ağdaki host sayısının artması durumunda çakışma ihtimali de doğrusal olarak artacaktır, bu durumda public ip adresi sayımızı artırmamız ve her hosta belirli bir public ip adresi vermemiz gerekecektir. Eğer ki tek bir public ip adresimiz var ve buna çok fazla host bağlanacaksa NAT yaklaşımı görüldüğü üzere bu sorunu tam çözmemekte.\n' +
    '\n' +
    'PAT (Port Adress Translation)\n' +
    '-----------------------------\n' +
    '\n' +
    'Bu yaklaşımın eksikliğini tamamlamak üzere NAT’in alt bir versiyonu olarak PAT (Port Adress Translation) ortaya çıkmıştır.\n' +
    'PAT yaklaşımında router hosttan gelen istekleri dinamik olarak kendi çakışmayacak şekilde belirlediği ephemeral port numaraları ile değiştirir aşağıdaki tabloyu inceleyelim;\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*sRRvGe-QL5TFrJ5cJuMInQ.png)\n' +
    '\n' +
    'Görüldüğü üzere **aynı hedefe**, **aynı ephemeral portlarla**, 2 farklı host istek göndermiş olsalar bile router PAT yaklaşımı kullandığı için her iki isteği de kendi dinamil ephemeral port atamasıyla benzersiz kılar, ve hangi datayı hangi hosta yönlendireceğini net bir şekilde bilir, evlerimizde olan modemler tahmin edersiniz ki PAT yaklaşımını kullanır.\n' +
    '\n' +
    'Bağlı Olduğumuz Ağın Hangi Yaklaşımı Kullandığını Öğrenmek Mümkün!\n' +
    '------------------------------------------------------------------\n' +
    '\n' +
    'Bu yazıya başlarken öğrenmek ve içselleştirmek hakkında kısa paragraf yazdım :)\n' +
    'NAT ve PAT hakkında öğrenmemiz gerekeni öğrendik, artık böyle bir soru karşımıza çıkarsa sınavlarda cevaplayabilir, veya arkadaşlarımızla sohbet edebiliriz. Şimdi gelin bu bilgiyi biraz içselleştirelim..\n' +
    '\n' +
    'Bahsettiğimiz üzere yerel ağda kullandığımız host’un işletim sistemi internete bağlanmak isteyen uygulamalar için dinamik olarak bir ephemeral port atar, yani her uygulama farklı bir ephemeral portu dinler.\n' +
    'Bu portlar üzerinden router’a isteğimiz gider, bunu somut olarak inceleyelim.\n' +
    '\n' +
    '[TCPView](https://learn.microsoft.com/en-us/sysinternals/downloads/tcpview) Windows işletim sistemlerinde çalışan bir araçtır ve bir bilgisayarın ağ bağlantılarını ayrıntılı bir şekilde analiz etmeye olanak tanır. Bu araç ile PuTTY uygulamamı filtreliyorum ve PuTTY üzerinden uzaktaki bir sunucuma (VPS) bağlanıyorum, görüldüğü üzere\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*RvFJ_YstH-DEVIpaD8nLMA.png)\n' +
    '\n' +
    'Bu tablodan aşağıdaki bilgileri çıkarıyoruz ;\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*yOeUdh2lpI9RStc3j0CCGA.png)\n' +
    '\n' +
    'Ardından public ip adresimi [buradan](https://www.ipsorgu.com/) öğreniyorum;\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*VWLHSLEGO43lj4ZfN4aHqw.png)\n' +
    '\n' +
    'Biliyoruz ki router PAT yada NAT yaklaşımının ikisinden birini kullanmakta ve public ip adresi ile internete çıkmak zorunda, hedef port adresi ve ip adresi ise sabit kalmakta yani NAT/PAT tablosundaki kaydımız potansiyel olarak şöyle gözükmekte ;\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*4CNMLwOBi3uNO7sS5EheMw.png)\n' +
    '\n' +
    'tablonun PAT yada NAT tablosu olduğunu öğrenmek için uzak sunucumuzun ağ detaylarını inceliyorum\n' +
    '(Linux-Fedora işletim sistemli VPC’im için “netstat” komutuyla bunu yapıyorum)\n' +
    '\n' +
    'Ağ istatistiklerinden aktif bağlantılarını incelediğimde şöyle bir tablo beni karşılıyor ;\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*1IHEGTR-3EMiwzzhuT8Uhw.png)\n' +
    '\n' +
    'router tarafından public ip adresi ile uzak sunucum ile kurulan bağlantıda ephemeral portun **53339** olduğu karşıma çıkıyor hostumun işletim sisteminin dinamik olarak atadığı port ile aynı!\n' +
    'Buda demek oluyor ki router sadece ip adresi üzerinden çevrim yapıyor ve kendisi ephemeral port atamıyor yani router NAT yaklaşımını benimsemekte.\n' +
    '\n' +
    '> şuan üzerinde inceleme yaptığım yurdun network mimarisinde her odaya RJ45 connectorlü LAN kabloları ile farklı public ip adresleri atanmış, bu durumda yurt yönetimi yeterli sayıda public ip adresine sahip olduğu için internet hızını optimum tutmak için böyle bir yaklaşım tercih etmiş zira 2–3 private ip adresinin tek bir public ip adresine bağlı olması durumunda NAT yaklaşımı tercih edilebilir bir opsiyon olacaktır.\n' +
    '\n' +
    'Ağ Katmanı (Network Layer, L3) router’ların devreye girdiği katmandır dedik, ve router’ların nasıl çalıştığı hakkında bilgi edindik.\n' +
    'Şimdi Ağ katanının 3 temel fonksiyonelliğini konuşacağız.\n' +
    '\n' +
    '1-Logicial Adressing (Mantıksal Adresleme)\n' +
    '------------------------------------------\n' +
    '\n' +
    'Taşıma Katmanında (Transport Layer, L4) data birimimize kaynak ve hedef port numaraları eklendi bunu segment olarak isimlendirdik. Ağ Katmanında (Network Layer, L3) ise segmentlerimize hedef ve kaynak ip adresleri eklenir, ardından Taşıma katmanı tarafından hangi protokol kullanıllarak bu segmentin ağ katmanına geldiği bilgisi de eklenir bunların sonucunda yeni oluşan PDU birimimize “Packet” (Paket) denilir.\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*noKNl21q471Akq1NSd9bDQ.png)\n' +
    '\n' +
    'Segmentlerimize kaynak ve hedef ip adresinin eklenmesi logical adressing işlemini temsil eder.\n' +
    '\n' +
    '2- Routing (Yönlendirme)\n' +
    '------------------------\n' +
    '\n' +
    'Artık router’ın nasıl çalıştığımı biliyoruz bu yüzden bu bölümü çok kolay bir şekilde anlayacağız, ip paketlerinin doğru kaynaktan hedefe gitmesi süreci burda gerçekleşir. Router’ın çalışma prensibinde NAT ve PAT işlemlerini konuştuk bu işlemin iki bilgisayar arasında değil de ağlar arasında gerçekleştiğini düşünelim.\n' +
    '\n' +
    '> Ağ, birbirine bağlı en az iki cihazın (örneğin bilgisayar, tablet, telefon, yazıcı, sunucu vb.) **veri paylaşımı yapmak** veya **kaynakları ortak kullanmak** amacıyla oluşturduğu iletişim altyapısıdır.\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*GIvuu01hfo7C7ZeOzx5x1g.png)\n' +
    '\n' +
    'Yukarıdaki görselde host A, host B’ye bir paket göndermek isterse bunu doğrudan yapamaz çünkü 2 host doğrudan aynı yerel ağda değil, ama host A’nın host B’nin olduğu ağ’ya (Network 2) erişimi var peki ama bu ağ içerisinde host B’ye doğrudan nasıl referans vereceğiz?\n' +
    '\n' +
    '> Bu iki ip adresi (192.168.1.1 ve 192.168.2.1) aynı ağ içerisinde olması gerekiyor gibi sanki ama neye göre? Sanki bir bilgi eksik…\n' +
    '\n' +
    'Subnet Mask (Alt Ağ Maskesi)\n' +
    '----------------------------\n' +
    '\n' +
    'Subnet Mask (Alt Ağ Maskesi), bir IP adresini ağ kısmı (network) ve cihaz kısmı (host) olarak ayırmak için kullanılan 32-bit uzunluğunda bir numaradır.\n' +
    'Hemen örnek vererek bu ne olduğu belirsiz tanımı netleştirelim :)\n' +
    '\n' +
    '*   192.168.1.32 IP adresi için Subnet Mask 255.255.255.0 ise\n' +
    '    Network Kısmı 192.168.1\n' +
    '    Host Kısmı 32\n' +
    '    (192.168.1 ağının 32 numaralı hostu)\n' +
    '*   192.168.1.21 IP adresi için Subnet Mask 255.255.0.0 ise\n' +
    '    Network Kısmı 192.168\n' +
    '    Host Kısmı 1.21\n' +
    '    (192.168 ağının 1.21 numaralı hostu)\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*2aR9mOpHmWRv-uVPqI6eaQ.png)\n' +
    '\n' +
    'Örneğimizde Subnet Maskesi 255.255.255.0 olarak seçilmiş, bu durumda aşağıdaki çıkarımı yapabileceğiz.\n' +
    '\n' +
    '![Subnet : 255.255.255.0](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*qKKSZUFrCYkJCpY9ioIWyQ.png)\n' +
    '\n' +
    'Subnet Mask’den yaptığımız çıkarım üzerinden de A ve B’nin farklı ağlar üzerinde olduğunu gördük, o zaman “A” hostu üzerinden 192.168.2 ağındaki 1 numaralı hosta paketimizin gideceğini kesinleştirdik.\n' +
    '\n' +
    '![Subnet 255.255.0.0](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*sBiTqtgT2IkJk94bjiQEyQ.png)\n' +
    '\n' +
    'Subnet Mask 255.255.0.0 olsaydı;\n' +
    'o zaman A ve B hostu aynı network içerisinde olacak ; 192.168 yerel ağımız üzerinden 1.1 hostundan -> 1.2 hostuna bir akış söz konusu olacaktı.\n' +
    '\n' +
    'Router nasıl çalışır kısmında öğrendiklerimizin üstüne, bu kısımda routing işlemi için sadece ip adresinin yeterli olmadığını ip adresi ve subnet mask bilgilerinin ikisine birlikte ihtiyaç duyulduğunu öğrendik.\n' +
    '\n' +
    'Ağ katmanının son fonksiyonelliğine geçiyoruz.\n' +
    '\n' +
    '3- Path Determination (Yol Belirleme)\n' +
    '-------------------------------------\n' +
    '\n' +
    'Önceki örnekte Network 1 ve Network 2 arasında sadece 1 tane yol vardı ve doğal olarak bu iletişimin gerçekleşmesi için bu yol kullanıldı, peki ama Network 1 ve Network 2 arasında birden fazla yol olsaydı?\n' +
    '\n' +
    '![paket iletimi için birden fazla yol olması durumu](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*cXicn170nNo9i2QoenFrzg.png)\n' +
    '\n' +
    'Burada 1,2,3…8 olarak adlandırılan düğümler networklerdir ve görüldüğü üzere paketi gönderen (sender) ve paketi alan (receiver) hostlar arasında birden fazla ağ var, bu durumda mevcut ağımız içerisindeki router bu hosta giden en iyi yolu nasıl belirler?\n' +
    'Bu yol belirleme işlemini router’lar daha önce konuştuğumuz NAT ve PAT tablolarındaki uyguladığı yaklaşıma benzer bir yaklaşım uygulayarak Routing Table (Yönlendirme Tablosu) kullanarak çözer, bu tabloyu ve router’ın bu tabloyu nasıl kullandığını biraz konuşalım.\n' +
    '\n' +
    'Routing Table (Yönlendirme Tablosu)\n' +
    '-----------------------------------\n' +
    '\n' +
    '(Bu kısım internetin nasıl çalıştığını anlayacağımız kısım, sonuna kadar okumanızı şiddetle tavsiye ederim)\n' +
    'Routing Table yada RIB (Routing Information Base), bir router’ın potansiyel olarak gidebileceği diğer ağları ve bunlarla ilişkili ölçümeri (mesafeleri) saklayan basit bir veri tablosudur. Router’a herhangi bir paket geldiğinde bu paketin hedef IP adresinin ağ kısmının (subnet mask ile ağ kısmını bulduğumuzu hatırlayalım), tablodaki herhangi bir değerde olup olmadığına bakılır.\n' +
    'Bu bölümü bir anaolji ile açıklayalım;\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*C2LErR8JABcIVAdtlBDIYg.png)\n' +
    '\n' +
    'Yukardardaki tabloda belirtiliği üzere;\n' +
    'Kurbağa -> Paket\n' +
    'Yapraklar->Router\n' +
    'Göletler->Subnet\n' +
    'Kurbağnın Gitmek İstediği Yer-> Paket’in Hedef IP Adresi (128.156.40.12)\n' +
    '\n' +
    '![Router A için Routing Table](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*jp8EN1bsu4jhU8yoPwQWvA.png)\n' +
    '\n' +
    'Router A içinde yukardaki gibi bir yönlendirme tablosu olsun. tablodaki bilinmeyenlerimizden biraz bahsedelim; Network/Subnet olarak isimlendirilen kısım router’in iletişim kurabileceği hedef ağlardır. Mask/Prefix ise subnet mask’i temsil eder peki ama subnet mask’in sonunda olan /24, /16 gibi değerler nedir? IP adresleri normalde ikilik (binary) sayı sisteminde 32 bitlik dizi olarak ifade edilirler fakat biz insanlar 10\'luk sayı sistemine daha aşina olduğumuz için böyle görmeyi tercih ederiz aşağıdaki tabloyu inceleyelim\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*SS0BHt7p2kdbe8ZDnZNfxg.png)\n' +
    '\n' +
    '> 10\'lu sayı sisteminde temsil ettiğimiz ip adreslerinde A.B.C.D formatındaki yapıda A, B, C ve D’nin her birine oktekt denir.\n' +
    '> Örn 192.168.1.23 →(192) 1. oktekt, (23) 4. oktet…\n' +
    '> ve bu oktetlerin her biri 8 bit ile ifade edilir. A.B.C.D/E gibi bir subnet mask gördüğümüzde ise şunu anlamalıyız ;**A.B.C.D subnet maskesindeki baştan “E” kadar bit network(ağ) kısmı için kalan kısım ise host kısmı için ayrılmış**. Bu teorik tanımı hemen netleştirelim\n' +
    '\n' +
    '192.168.1.23/24 gördüğümüzde baştan ilk 24 bitin ağ kısmı için ayrıldığını anladık ve biz biliyoruz ki 8 bit 1 oktet;\n' +
    'bu durumda 3 oktetin (8x3) 24 bit yaptığı cıkarımıyla 192.168.1 kısmını network kısmı 23 kısmını ise host kısmı olarak aldık.\n' +
    '\n' +
    'Tablomuza tekar bir göz atalım, metric ise, bir yönlendirme tablosunda belirli bir rotanın öncelik veya maliyetini temsil eden bir değerdir. Daha düşük bir metric değeri, genellikle daha tercih çok edilen bir rota anlamına gelir.\n' +
    '\n' +
    '![Router A için Routing Table](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*jp8EN1bsu4jhU8yoPwQWvA.png)\n' +
    '\n' +
    'Paketimizin Hedef IP Adresi : **128.156.40.12** idi burada her satır değeri ile hedefimizi karşılaştıracağız.\n' +
    '\n' +
    '1.yönlendirme (0.0.0.0) tabloda hedef ip adresi ile eşleşen hiçbir kayıt yoksa bizi bir üst router’a yönlendirir, diğer kayıtları (yönlendirmeleri) kontrol ettikten sonra bulamazsak bir üst router’a gideceğiz (bizim durumumuzda Router B ve Router C)\n' +
    '\n' +
    '2.yönlendirme 128.156.20.0/24 yani ağ kısmı-> 128.156.20\n' +
    'Hedef ip adresi içinse 128.156.40.12/24 -> ağ kısmı 128.156.40\n' +
    'görüldüğü üzere yönlendirmenin refere ettiği adres ve hedef ip adresimiz aynı network içerisinde değil burda bir eşleşme olmadı.\n' +
    'Not: Her yönlendirmenin subnet maskesini hedef ip adresine de uyguluyoruz.\n' +
    '\n' +
    '3.yönlendirme 128.156.40.0/24, ağ kısmı ->128.156.40\n' +
    'hedef ip adresi için 128.156.40.12/24, ağ kısmı ->128.156.40\n' +
    'görüldüğü üzere eğer 3.yönlendirmeye gidersek hedef ip adresi ile aynı ağ’da bir hedefe ulaşacağız,yani 3.kayıt potansiyel hedefe ulasabileceğimiz bir yol. Devam edip diğer yönlendirmelere bakalım.\n' +
    '\n' +
    '4.yönlendirme 128.156.0.0/**16**, ağ kısmı 128.156\n' +
    'hedef ip adresi için 128.156.40.12/**16**, ağ kısmı->128.156\n' +
    '(Her kaydın kendi subnet maskesini hedef ip adresine de uyarladığımızı tekrar hatırlatıyorum)\n' +
    'görüldüğü üzere 4.yönlendirmede de hedef ip adresi ile aynı network içerisinde oluyoruz buradan da potansiyel bir yol bulduk.\n' +
    '\n' +
    '5.yönlendirme 128.156.45.0/24, ağ kısmı 128.156.45\n' +
    'hedef ip adresi için 128.156.40.12/24, ağ kısmı 128.156.40\n' +
    'Son olarak bu yönlendirmeye de gidersek hedef ip adresimiz ile aynı ağda olmayacağız.\n' +
    '\n' +
    'Sonuç olarak hedef ip adresimize giden 2 potansiyel yol bulduk peki bunlardan hangisini seçeceğiz?,\n' +
    '\n' +
    '![bu soru aslında path determination başlığında gördüğümüz sorunun teknik cevabı olacak](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*6hRt6Zx8Ui2l3LTAiLWHEA.png)\n' +
    '\n' +
    '**3.önlendirme**\n' +
    '128.156.40.0/24, ağ kısmı ->128.156.40\n' +
    'hedef ip adresi için 128.156.40.12/24, ağ kısmı ->**128.156.40**\n' +
    '\n' +
    '**4.Yönlendirme**\n' +
    '128.156.0.0/**16**, ağ kısmı 128.156\n' +
    'hedef ip adresi için 128.156.40.12/**16**, ağ kısmı->**128.156**\n' +
    '\n' +
    'Bu durumda **en spesifik eşleşmeyi seçeriz** yani 128.156.40 ağı hedefimize daha yakındır 3.yönlendirmeyi seçerek devam ederiz. Bu **Longest Prefix Match (LPM)** yöntemi olarak da bilinir.\n' +
    '**LPM (Longest Prefix Match)**, özellikle yönlendirme protokollerinde (örneğin BGP, OSP..) kullanılan bir yöntemdir.\n' +
    '\n' +
    'Büyük Resim\n' +
    '-----------\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1324/format:webp/1*LAB8nFwU1Jw1RfzYcsimPQ.png)\n' +
    '\n' +
    'Şimdik geldik en zevkli kısıma bütün internet nasıl çalışır? , aslında fark ettik ki internet dediğmiz şey birbirlerine yüzbinlerce router trafından bağlanmış milyonlarca hosttan başka birşey değil nasıl çalıştığı ise bu router’ların gidecekleri hedefe nasıl karar verdiklerinden ibaret.\n' +
    'global internetteki router’lar BGP (Border Gateway Protocol) protokolünü kullanarak hedefe ulaşır. BGP internetin omurgası olarak bilinir.\n' +
    'BGP (Border Gateway Protocol), internetteki yönlendirmelerin bel kemiğini oluşturan bir yönlendirme protokolüdür. Otonom Sistemler (AS, Autonomous Systems) arasındaki yolları belirlemek ve yönlendirmek için kullanılır. İnternetteki farklı ağları (AS’leri) bir arada tutan temel protokol olduğu için çok kritik bir rol oynar.\n' +
    'Peki Autonomous System (Otonom Sistem) nedir? **AS (Autonomous System)**, internetin yapısında önemli bir yapı taşını temsil eder. Kendi başına bir ağ yöneticisi tarafından yönetilen ve tek bir politika ile kontrol edilen bir ağ grubudur. Bu ağ, aynı yönlendirme protokollerini kullanarak dış dünya ile iletişim kurar ve genellikle bir ISP (Internet Service Provider, örn; Türkcell, Türk Telekom..), büyük bir organizasyon veya bir kurum tarafından yönetilebilir.\n' +
    '\n' +
    '![AS’ler peering anlaşmaları ile birbirlerine bağlanır.](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*TnarpJnnQxIGPpMYchwXmw.png)\n' +
    '\n' +
    'İnternetteki trafiğin nasıl yönlendirileceği, otonom sistemler arasındaki peering anlaşmalarına bağlıdır. Her bir otonom sistem sadece kendi ağına değil, aynı zamanda diğer otonom sistemlere de yönlendirme bilgileri gönderir. Bu sayede, farklı otonom sistemler birbirleriyle haberleşebilir. Örneğin:\n' +
    '\n' +
    '*   Küçük bir otonom sistem(örneğin bir içerik sağlayıcısı veya bir yerel ISP), daha büyük bir otonom sistem ile peering yaparak internet erişimi sağlar.\n' +
    '*   **İki büyük** otonom sistem birbirleriyle peering yaparak, doğrudan veri alışverişi yapabilir ve internetin daha hızlı ve verimli bir şekilde işlemesini sağlar.\n' +
    '\n' +
    '![ISP A ile ISP B peering anlaşması yaptı ve ortaya Transit ISP dediğimiz yapı çıktı, Transit ISP (Birden fazla otonom sistemin olduğu yapı) noktaları ise backbone noktalarıyla bağlantı kurar.](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*8ELKiBScoTidin1B.jpg)\n' +
    '\n' +
    'İnternet, **otonom sistemler arasındaki peering anlaşmaları ve internet omurgası (backbone)** ile oluşur. Bu yapılar sayesinde, farklı coğrafi bölgelerdeki ağlar birbirine bağlanır. Her otonom sistem, belirli bir IP adresi bloğuna sahiptir ve internet trafiği, bu otonom sistemler arasında yönlendirilerek en uygun yol üzerinden hedefe ulaşır.\n' +
    '\n' +
    '![Örneğin siz AS100\'den bir host ile AS200\'deki bir hosta bağlanmak isterseniz nihayetinde peering anlaşması noktasında (Transit Point) bu yönlendirme tablosunda isteğiniz yönlendirilir. evet evet bu bildiğimiz routing table :)](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*5_Km19CnsQBEsG8g20sAnQ.png)\n' +
    '\n' +
    '**Peki ya Backbone?**\n' +
    'Backbone (Omurga), bir ağda, genellikle en yüksek hızda veri iletimi sağlayan, merkezi ve güçlü bir ağ altyapısıdır. İnternetin omurgası, dünya çapında farklı ağlar arasında veri iletimini sağlamak için kullanılan ana hatları ifade eder. İnternet omurgası, ağın temel bağlantı noktalarını ve en hızlı iletim yollarını içerir.\n' +
    'Örneğin: Bir web sitesi ziyaret edildiğinde, kullanıcının isteği, bağlı olduğu ağdan (örneğin, bir yerel internet servis sağlayıcısından) omurgaya yönlendirilir. Omurga, bu isteği hedef sunucuya iletmek için gerekli yönlendirmeyi yapar. Sunucudan gelen veri, aynı yol üzerinden kullanıcının cihazına geri iletilir.\n' +
    '\n' +
    '![backbone (omurga) dediğimiz bu yapı backbone points (omurga noktaları) aracılığı ile birbirlerine bağlanır. backbone noktalarına Transit ISP noktaları bağlanarak global internet erişimi için devasa yapı oluşturulmuş olur.](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*budU93fVBDyP9bHFnxddSw.png)\n' +
    '\n' +
    'Eveeet… Ağ Katmanının (Network Layer, L3) son fonksiyonelliği olan path determination özelliğini de anladık, an itibariyle Ağ katmanını bitirdik bir sonraki durağımız Veri Bağlantı Katmanı (Data Link Layer, L2)\n' +
    '\n' +
    'Veri Bağlantı Katmanı (Data Link Layer, L2)\n' +
    '===========================================\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*F1EWeLWnEX3qef1JtEYOzg.png)\n' +
    '\n' +
    'Datamız taşıma katmanında parçalara bölündü (segmente edildi) ardından hedef ve kaynak IP adresleri eklendi ardından PDU birimimize segment dedik.Network katmanında hostlara logical adressing yaptık ve ardından segmentlere hedef ve kaynak ip adreslerini ekledik bunun sonucunda PDU birimimiz paket oldu.\n' +
    'Veri Katmanında ise bu paketlere hedef ve kaynak MAC (Media Acess Control) adreslerini ekliyoruz (physical adressing) ardından PDU birimimiz “frame” olarak isimlendiriliyor. MAC adresleri NIC (Network Interface Card/Controller) donanımızda olan 48 bit uzunluğunda alfanümerik (harfler ve rakamlardan oluşan) bir dizidir, her NIC kartının MAC adresi benzersizdir.Bu adres, dünya genelinde her ağ kartı için farklıdır ve bir ağda cihazların birbirlerini tanımasına olanak tanır.\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*3lZo_tQLJLaTgzSIwPrtjA.png)\n' +
    '\n' +
    'Ver Bağlantı Katmanı Local Media (Yerel Ortamı) üzerinden hedef NIC kartıma frame göndermekten sorumludur, burada local media dediğimiz şey müzik, video veya herhangi bir dosya değildir.\n' +
    '**Local media**, ağ üzerinde veri iletiminin gerçekleştiği **iletişim ortamı** anlamına gelir. Bu, ağ üzerinde kullanılan teknolojilere ve fiziksel bağlantılara göre değişir. Bu ortamlar, örneğin:\n' +
    '\n' +
    '*   **Ethernet kablosu** (kablolu ağlar için)\n' +
    '*   **Wi-Fi** (kablosuz ağlar için)\n' +
    '*   **Fiber optik kablolar**\n' +
    '*   **Bluetooth** gibi teknolojiler olabilir.\n' +
    '\n' +
    '**Data Link Layer (Veri Bağlantı Katmanı)** temel olarak iki ana işlevi yerine getirir.\n' +
    '\n' +
    '**1- Üst Katmanların Yerel İletişim Ortamına (Local Media) Erişiminin Sağlanması**\n' +
    '\n' +
    '*   **Framing** yöntemiyle, üst katmanlardan gelen verileri yerel medya (örneğin Ethernet veya Wi-Fi) için uygun bir formata dönüştürür.\n' +
    '*   Bu işlem sırasında, gelen veriler çerçevelere (frames) ayrılır ve bu çerçeveler hedef ve kaynak MAC adresleri ile donatılır. Ayrıca, hata kontrol bilgileri eklenerek doğru bir iletim sağlanır\n' +
    '\n' +
    '> **Medium**, tekil bir iletişim ortamını ifade ederken (örneğin, bakır kablo veya radyo dalgaları), **media** bu terimin çoğul halidir ve birden fazla ortamı tanımlamak için kullanılır. Örneğin, kablo ve kablosuz iletişim birlikte kullanıldığında “media” terimiyle ifade edilirken, yalnızca fiber optik bir iletişimden bahsediliyorsa “medium” denir. Bu nedenle, ağ iletişiminde “media access control” gibi ifadeler tüm iletişim ortamlarına erişim kontrolünü kapsar.\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Fz0bS8zEHtHdfJQOXomZNA.png)\n' +
    '\n' +
    'örneğin burada A bilgisayarı B bilgisayarına bir veri göndermek istiyor olsun A bilgisayarının ağ katmanında ip paketinin başlığına (header, H1)\n' +
    'hedef ve kaynak MAC adresleri eklenir ardından kuyruk kısmına (tail, T1) hata kontrolu için cheksum değeri eklenir. Tabi burda hedef MAC adresi doğrudan B bilgisayarının MAC adresi değildir, çünkü görüldüğü üzere A ve B doğrudan aynı ağ içerisinde değil yani burada ilk hedef R1 routeri.\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*eh0G5m3OvmYUTT4EcItZDA.png)\n' +
    '\n' +
    'ardından R1 routeri A bilgisayarından aldığı frame’i kendi bir üst katmanına (ağ katmanına) göndererek paketin destinasyon ip adresini öğrenir bu işleme dekapsülasyon (decapsulation) denir. ardından network 1 içerisinde bu destinasyon IP’nin olmadığını routing table’dan gören R1 router’i ip paketine kendi H2 ve T2 bilgilerini ekleyerek tekrar bir frame oluşturur (framing) bu frame’i uydu üzerinden R2 routerine gönderir.\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*BsGnJJOXaKoqztUCZB-F_Q.png)\n' +
    '\n' +
    'R2 Router’ı, R1 Router’ından gelen frame’i dekapsüle eder, yani frame’in başlık (H1 ve T1) bilgilerini çıkarır. Ardından IP paketi üzerinden hedef IP adresinin yerel ağda olduğunu yönlendirme tablosundan görür. R2 Router, paketi yeni bir frame içine enkapsüle ederek (H3 ve T3 bilgileriyle) medium’a (örneğin kablosuz ağ) gönderir. Bu yeni frame’in kaynak MAC adresi R2 Router’ın çıkış arayüzünün MAC adresidir, hedef MAC adresi ise doğrudan laptopun MAC adresidir. Laptop bu frame’i alır, dekapsüle eder ve veriyi işler. **Bu süreçte frame her bir yönlendirmede yeniden oluşturulur, ancak IP paketi sabit kalır. Bu işlem, framing olarak isimlendirilir ve veri bağlantı katmanının önemli bir işlevselliğidir.**\n' +
    '\n' +
    'Şimdi 2. fonksiyonelliğimize geçelim..\n' +
    '\n' +
    '**2-Ortam Erişimi Kontrolü ve Hata Kontrolü (MAC & Error Control)**\n' +
    '\n' +
    'Veri Bağlantı Katmanının ikinci temel işlevselliği, **ortam erişimi kontrolü** ve **hata kontrolü** süreçlerini gerçekleştirmektir. Bu işlevler, verinin fiziksel ortamda çarpışmalara uğramadan, doğru sırayla ve eksiksiz iletilmesini sağlar.\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*95R1RbeiIDCrwr2MHJYvTQ.png)\n' +
    '\n' +
    'Birden fazla host aynı anda **tek bir local media** (örneğin, bir Ethernet ağı) üzerinden internete çıkmaya veya dış bir kaynağa bağlanmaya çalıştığında, **collision (çarpışma)** meydana gelebilir. Bu durum, aynı anda iki veya daha fazla cihazın veriyi iletmek için aynı iletişim hattını kullanması sonucu ortaya çıkar. Çarpışma, verinin bozulmasına yol açar, çünkü her cihazın gönderdiği veri birbirine karışır.\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*e4iqeZOoiEwaDedjgTmBJA.png)\n' +
    '\n' +
    '**Veri Bağlantı Katmanı** (Data Link Layer) bu tür çarpışmaları önlemek için **NIC kartlarının** (Network Interface Card) ortamı dinlemesini sağlar. Bu işlem, genellikle **CSMA/CD** (Carrier Sense Multiple Access with Collision Detection) protokolü ile gerçekleştirilir. Bu protokolde her **host’un NIC kartı** ağ üzerindeki veri hattını dinler ve şu şekilde çalışır:\n' +
    '\n' +
    '**1- Carrier Sense (Taşıyıcıyı Dinleme)**: NIC kartı, iletim yapmadan önce ortamda veri iletimi olup olmadığını kontrol eder. Eğer ortamda veri iletimi (yani kanal zaten kullanılıyorsa) tespit edilirse, cihaz bekler.\n' +
    '\n' +
    '**2- Collision Detection (Çarpışma Tespiti)**: Eğer iki cihaz aynı anda veri göndermeye başlarsa ve bir çarpışma meydana gelirse, her iki cihaz da çarpışmayı fark eder ve gönderilen veriyi durdurur.\n' +
    '\n' +
    '**3- Çarpışma Durumunda Tekrar Deneme**: Çarpışma algılandığında, cihazlar rastgele bir süre bekler ve sonra tekrar ortamı dinleyip, ortam boşsa veriyi iletmeye başlarlar. Bu bekleme süresi, çarpışmaların tekrar oluşmasını önlemek için önemlidir.\n' +
    '\n' +
    'Evet veri bağlantı katmanımızın 2 temel işlevselliğini de konuştuk şimdik son durağımıza geldik.\n' +
    '\n' +
    'Fiziksel Katman (Physical Layer, L1)\n' +
    '====================================\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*v5RopwZw2M4_YYm4VV9_mA.png)\n' +
    '\n' +
    'Herzaman olduğu gibi katmanımıza başlamadan önce hangi aşamada olduğumuzu tekrar kontrol edelim uygulama katmanından gelen verimiz segmente edildi kaynak ve hedef portlar eklendi PDU birimi segment oldu. Sonrasında ağ katmanına gelen segmente hedef ve kaynak ip adresi eklendi PDU birimimiz paket oldu.\n' +
    'Veri bağlantı katmanımızda paketimize hedef ve kaynak MAC adresleri eklendi & framecheksum eklendi ardından yeni PDU birimimiz frame oldu.\n' +
    '\n' +
    '**Frame’lar**, veri bağlantı katmanında iletilen **bit dizileridir** ve bu bitler (1\'ler ve 0\'lar) fiziksel medya üzerinden iletilir. Frame, veriyi taşıyan birimlerdir veri frame yapısında bilgisayarlar arasında fiziksel olarak iletilirken yalnızca 1\'ler ve 0\'lar olarak temsil edilir.\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Y5NU-rLDR0zQiAtActfgnQ.png)\n' +
    '\n' +
    'Fiziksel katman, veri bağlantı katmanından alınan **bit dizilerini**, **sinyallere dönüştürerek** fiziksel ortama iletmekle sorumludur. Medyanın türüne bağlı olarak bu dönüşüm farklı şekillerde gerçekleşir: **Bakır kablo** üzerinden veri iletildiğinde bitler **elektriksel sinyallere** dönüştürülür, **optik kablo** kullanıldığında ise bit dizileri **ışık sinyalleri** olarak iletilir. **Kablosuz iletişim**de ise, bitler **radyo dalgalarına** veya **mikrodalgalar** gibi elektromanyetik sinyallere dönüştürülür. Bu sinyaller, fiziksel katman aracılığıyla medya üzerinden iletilir ve verinin doğru bir şekilde ulaşması sağlanır.\n' +
    '\n' +
    '> Bu dönüşün işlemini NIC (Network Interface Card/Controller) kartımız yapar.\n' +
    '\n' +
    '![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*yAEZ2dG2VzfgqyO2U6Uemw.png)\n' +
    '\n' +
    'Alıcı tarafında ise, alıcının fiziksel katmanı bu medya sinyallerini alıp bitlere dönüştürür ardından frame dekapsule edilip bir üst katmana gönderilir ve bu işlemin sonunda veri, uygulama katmanına kadar ulaşır.\n' +
    '\n' +
    '> Katmanların her birinde neler olduğunu detaylı şekilde konuştuk, başınızı yastığa koyduğunuzda neler olduğunu hayal ederken katmanların isimlerini unutursanız aşağıdaki cümleyi bir hatırlatıcı olarak kullanabilirsiniz :)\n' +
    '> \n' +
    '> (P)lease (D)o (N)ot (T)ell (S)ecret (P)assword (A)nyone\n' +
    '> \n' +
    '> (P)hysical Layer->(D)ata Link Laye>(N)etwork Layer->(T)ransport Layer->(S)ession Layer -> (P)resentation Layer ->(A)pplication Layer\n' +
    '> \n' +
    '> (A)ll (P)eople (S)eem (T)o (N)eed(D)ata (P)rocession\n' +
    '> \n' +
    '> (A)pplication Layer->(P)resentation Layer -> (S)ession Layer->(T)ransport Layer->(N)etwork Layer->(D)ata Link Layer->(P)ysical Layer\n' +
    '\n' +
    'Buraya kadar okuyan herkese teşekkür ederim, umarum faydalı bir yazı olmuştur.\n' +
    '\n' +
    'Kaynakça\n' +
    '--------\n' +
    '\n' +
    '*   [https://www.geeksforgeeks.org/difference-between-network-address-translation-nat-and-port-address-translation-pat/](https://www.geeksforgeeks.org/difference-between-network-address-translation-nat-and-port-address-translation-pat/)\n' +
    '*   [https://bulutistan.com/blog/osi-modeli-nedir](https://bulutistan.com/blog/osi-modeli-nedir)\n' +
    '*   [https://www.javatpoint.com/network-address-translation-vs-port-address-translation](https://www.javatpoint.com/network-address-translation-vs-port-address-translation)\n' +
    '*   [https://www.youtube.com/watch?v=UA0jxZ-hXkM](https://www.youtube.com/watch?v=UA0jxZ-hXkM)\n' +
    '*   [https://www.youtube.com/watch?v=vv4y_uOneC0&t=863s](https://www.youtube.com/watch?v=vv4y_uOneC0&t=863s)\n' +
    '*   [https://www.youtube.com/watch?v=PbFaC3Y5yV4&t=402s](https://www.youtube.com/watch?v=PbFaC3Y5yV4&t=402s)\n' +
    '*   [https://www.youtube.com/watch?v=pbqc6IlFuVc](https://www.youtube.com/watch?v=pbqc6IlFuVc)\n' +
    '*   [https://en.wikipedia.org/wiki/OSI_model](https://en.wikipedia.org/wiki/OSI_model)\n' +
    '*   [https://www.imperva.com/learn/application-security/osi-model/](https://www.imperva.com/learn/application-security/osi-model/)\n' +
    '*   [https://www.youtube.com/watch?v=KA56kj23RPU&t=257s](https://www.youtube.com/watch?v=KA56kj23RPU&t=257s)';
export default defaultMD;
