import { Header } from '@/components/Header';
import { ScrollScene } from '@/components/ScrollScene';
import { SpaMenu } from '@/components/SpaMenu';
import { Promotions } from '@/components/Promotions';
import { About } from '@/components/About';
import { Gallery } from '@/components/Gallery';
import { Contacts } from '@/components/Contacts';
import { BookingCta } from '@/components/BookingCta';
import { Footer } from '@/components/Footer';
import { useLenis } from '@/hooks/useLenis';

function App() {
  useLenis();
  return (
    <>
      <Header />
      <main>
        <ScrollScene />
        <Promotions />
        <SpaMenu />
        <About />
        <Gallery />
        <Contacts />
        <BookingCta />
      </main>
      <Footer />
    </>
  );
}

export default App;
