export function PromoCodeStrip() {
  return (
    <div className="bg-tk-offwhite border-y border-tk-gray-lt">
      <div className="tk-container py-3 text-center text-sm font-poppins text-tk-black overflow-x-auto whitespace-nowrap hide-scrollbar">
        <span className="font-bold text-tk-red">TK10</span> – 10% off above ₹999
        &nbsp;|&nbsp;
        <span className="font-bold text-tk-red">TK20</span> – 20% off above ₹1999
        &nbsp;|&nbsp;
        <span className="font-bold text-tk-red">WELCOME15</span> – 15% off on first order
      </div>
    </div>
  );
}
