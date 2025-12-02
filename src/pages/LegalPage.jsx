import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import PageHeader from '../components/common/PageHeader'

const LegalPage = () => {
  return (
    <div className="min-h-screen bg-white-dark flex flex-col">
      <Navbar />
      <PageHeader title="Mentions Légales" />

      <div className="flex-1 flex mt-10 px-6">
        <div className="w-full max-w-[1800px] mx-auto">
          <div className="overflow-x-auto">
            <section className="mb-6">
              <h2 className="font-bold text-xl mb-2 text-primary">Propriétaire du site</h2>
              <p>formula-one.fr / Yann Le Saint</p>
            </section>

            <section className="mb-6">
              <h2 className="font-bold text-xl mb-2 text-primary">Adresse</h2>
              <p>46 avenue Edouard Millaud, 69290 Craponne, France</p>
            </section>

            <section className="mb-6">
              <h2 className="font-bold text-xl mb-2 text-primary">Email</h2>
              <p>contact@formulaone.fr</p>
            </section>

            <section className="mb-6">
              <h2 className="font-bold text-xl mb-2 text-primary">Hébergeur</h2>
              <p>Netlify Inc., 2325 3rd Street, San Francisco, CA, USA</p>
            </section>

            <section className="mb-6">
              <h2 className="font-bold text-xl mb-2 text-primary">Propriété intellectuelle</h2>
              <p>
                Tous les contenus du site (textes, images, logos, graphiques) sont protégés. Toute
                reproduction, distribution ou utilisation sans autorisation est interdite.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="font-bold text-xl mb-2 text-primary">Données personnelles</h2>
              <p>
                Conformément à la loi RGPD, vos données personnelles ne sont collectées qu’avec
                votre consentement et ne sont jamais partagées avec des tiers sans autorisation.
              </p>
            </section>

            <section className="mt-12 text-sm text-white-lighter">
              <p>© {new Date().getFullYear()} formulaone.fr | Tous droits réservés.</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default LegalPage
