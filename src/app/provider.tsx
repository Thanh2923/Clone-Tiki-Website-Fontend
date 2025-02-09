'use client';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store'; // Import store Redux
import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import { Suspense, useState } from 'react';
import Loading from '@/components/loading/Loading';
import { CategoriesMobile } from '@/components/categories/CategoriesMobile';
import Categories from '@/components/categories/Categories';
type ReduxProviderProps = {
  children: React.ReactNode;
};

export default function ReduxProvider({ children}: ReduxProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SessionProvider>
      <Provider store={store}> 
      <Suspense fallback={<Loading/>}>
        <Header />
        {isOpen ? 
          <div className='w-full fixed z-10 rounded-t-3xl top-[10%] shadow-lg h-full bg-white left-0'>
<Categories setIsOpen={setIsOpen}/>
          </div>
         : ""}
        <CategoriesMobile setIsOpen={setIsOpen}/>
        
        <main className="w-full flex items-center justify-center">
          <div className="w-[95%] py-5 flex justify-between">
            {children}
          </div>
        </main>
        <Footer />
        </Suspense>
      </Provider>
    </SessionProvider>
  );
}
