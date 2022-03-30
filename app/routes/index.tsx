export default function Index() {

  return (
    <div className="bg-white">
      <div className="pt-6 pb-16 sm:pb-24">
        <div className="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">

            {/* Image gallery */}
            <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
              <img
                        className="'lg:col-span-2 lg:row-span-2'"
                        src="https://planificacionestrategica.online/storage/calculator/recibo.jpg"
                        alt=""
                    />
              </div>
            </div>

            <div className="mt-8 lg:col-span-5">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}