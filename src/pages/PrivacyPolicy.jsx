import { motion } from 'framer-motion'
import './PrivacyPolicy.css'

export function PrivacyPolicy() {
  return (
    <div className="privacy-page">
      <motion.div 
        className="privacy-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Gizlilik Politikası</h1>
        <p className="last-updated">Son güncelleme: 22 Ağustos 2024</p>

        <div className="privacy-section">
          <p>
            Bu Gizlilik Politikası, Hizmeti kullandığınızda bilgilerinizin toplanması, kullanılması ve 
            açıklanmasına ilişkin politika ve prosedürlerimizi açıklar ve size gizlilik haklarınızı ve 
            yasaların sizi nasıl koruduğunu anlatır.
          </p>

          <p>
            Kişisel verilerinizi Hizmeti sağlamak ve geliştirmek için kullanırız. Hizmeti kullanarak, 
            bilgilerin bu Gizlilik Politikası doğrultusunda toplanmasını ve kullanılmasını kabul etmiş 
            olursunuz.
          </p>
        </div>

        <div className="privacy-section">
          <h2>Yorum ve Tanımlar</h2>
          <h3>Yorum</h3>
          <p>
            Baş harfi büyük yazılmış kelimeler, aşağıdaki koşullar altında tanımlanmış anlamlara sahiptir. 
            Aşağıdaki tanımlar tekil veya çoğul olarak görünmelerine bakılmaksızın aynı anlamı taşıyacaktır.
          </p>

          <h3>Tanımlar</h3>
          <p>Bu Gizlilik Politikası kapsamında:</p>
          <ul>
            <li><strong>Hesap:</strong> Hizmetimize veya Hizmetimizin belirli bölümlerine erişmek için oluşturulan benzersiz hesabınız.</li>
            <li><strong>Şirket:</strong> (bu Anlaşmada "Şirket", "Biz", "Bize" veya "Bizim" olarak anılır) Harmony Haven'ı ifade eder.</li>
            <li><strong>Ülke:</strong> Türkiye</li>
            <li><strong>Cihaz:</strong> Bilgisayar, cep telefonu veya dijital tablet gibi Hizmete erişebilen herhangi bir cihaz.</li>
            <li><strong>Kişisel Veri:</strong> Tanımlanmış veya tanımlanabilir bir bireyle ilgili her türlü bilgi.</li>
            <li><strong>Hizmet:</strong> Uygulamayı ifade eder.</li>
            <li><strong>Hizmet Sağlayıcı:</strong> Şirket adına veriyi işleyen herhangi bir gerçek veya tüzel kişi.</li>
            <li><strong>Kullanım Verileri:</strong> Hizmetin kullanımı veya Hizmet altyapısının kendisi tarafından otomatik olarak toplanan veriler.</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>Kişisel Verilerinizin Toplanması ve Kullanılması</h2>
          <h3>Toplanan Veri Türleri</h3>
          
          <h4>Kişisel Veriler</h4>
          <p>
            Hizmetimizi kullanırken, sizinle iletişim kurmak veya sizi tanımlamak için kullanılabilecek 
            bazı kişisel bilgileri bize sağlamanızı isteyebiliriz. Kişisel olarak tanımlanabilir bilgiler 
            şunları içerebilir:
          </p>
          <ul>
            <li>E-posta adresi</li>
            <li>Ad ve soyad</li>
            <li>Kullanım Verileri</li>
          </ul>

          <h4>Kullanım Verileri</h4>
          <p>
            Kullanım Verileri, Hizmet kullanılırken otomatik olarak toplanır. Kullanım Verileri şunları içerebilir:
          </p>
          <ul>
            <li>Cihazınızın İnternet Protokol adresi (IP adresi)</li>
            <li>Tarayıcı türü ve versiyonu</li>
            <li>Ziyaret ettiğiniz sayfalar ve ziyaret süreleri</li>
            <li>Benzersiz cihaz tanımlayıcıları ve diğer tanılama verileri</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>Kişisel Verilerinizin Kullanımı</h2>
          <p>Şirket, Kişisel Verileri aşağıdaki amaçlar için kullanabilir:</p>
          <ul>
            <li>Hizmetimizi sağlamak ve sürdürmek için</li>
            <li>Hesabınızı yönetmek için</li>
            <li>Güncellemeler ve önemli bilgilendirmeler için sizinle iletişime geçmek için</li>
            <li>Hizmetimizi analiz etmek ve iyileştirmek için</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>Çocukların Gizliliği</h2>
          <p>
            Hizmetimiz 13 yaşın altındaki kişilere hitap etmemektedir. 13 yaşın altındaki kişilerden 
            bilerek kişisel olarak tanımlanabilir bilgi toplamıyoruz.
          </p>
        </div>

        <div className="privacy-section">
          <h2>Bu Gizlilik Politikasındaki Değişiklikler</h2>
          <p>
            Gizlilik Politikamızı zaman zaman güncelleyebiliriz. Herhangi bir değişikliği bu sayfada 
            yayınlayarak size bildireceğiz.
          </p>
        </div>

        <div className="privacy-section">
          <h2>Bizimle İletişime Geçin</h2>
          <p>
            Bu Gizlilik Politikası hakkında herhangi bir sorunuz varsa, bizimle iletişime geçebilirsiniz:
          </p>
          <ul>
            <li>E-posta: <a href="mailto:harmonyhavenapp@gmail.com">harmonyhavenapp@gmail.com</a></li>
            <li>Web sitesi: <a href="http://harmonyhaven.erdemserhat.com/" target="_blank" rel="noopener noreferrer">harmonyhaven.erdemserhat.com</a></li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
} 