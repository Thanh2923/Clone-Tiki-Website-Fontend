const FormatPrice: React.FC<{ price: number  }> = ({ price }) => {
    const formattedPrice = new Intl.NumberFormat("vi-VN").format(price);
    return <span>{formattedPrice}</span>;
  };
  
  export default FormatPrice;