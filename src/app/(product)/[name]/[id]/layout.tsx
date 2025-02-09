
import React, { ReactNode } from 'react';

interface ProductLayoutProps {
  children: ReactNode;  // Khai báo kiểu cho children
}

const ProductLayout: React.FC<ProductLayoutProps> = ({ children }) => {
  return (
   <>
   {children}
   </>
        
  );
}

export default ProductLayout;
