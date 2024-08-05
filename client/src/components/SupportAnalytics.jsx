import React from 'react'

export default function SupportAnalytics() {
    return (
        <>
            <div className="flex flex-wrap items-center w-full p-2 mb-2 bg-gray-50 border-b-10 border-yellow-500">
                <div className="col-span-12 md:col-span-8 p-2">
                    <h6 className="text-2xl font-semibold text-black">
                        Support Analytics
                    </h6>
                </div>
            </div>
            <div className="shadow-lg bg-white border-gray-300 p-4 mb-5 transition-all duration-300 ease-in-out">
                <div className="flex items-center flex-wrap -mx-2">
                    <div className="w-3/4 px-2">
                        <p className="text-gray-600 text-sm mb-4">
                            <span>Total Tickets (last 30d)</span>
                        </p>
                        <h2 className="text-2xl font-medium text-gray-900 mb-2">0</h2>
                    </div>
                    <div className="w-1/4 px-2 text-center">
                        <div className="box-shadow-img">
                            <span className="hidden">5,3,9,6,5,9,7</span>
                            <svg height="28" width="48" className="inline-block align-middle">
                                <rect
                                    height="15.555555555555557"
                                    width="4.114285714285715"
                                    fill="#e74c3c"
                                    x="1.3714285714285717"
                                    y="12.444444444444443"
                                />
                                <rect
                                    height="9.333333333333332"
                                    width="4.114285714285716"
                                    fill="#e74c3c"
                                    x="8.228571428571428"
                                    y="18.666666666666668"
                                />
                                <rect
                                    height="28"
                                    width="4.1142857142857086"
                                    fill="#e74c3c"
                                    x="15.085714285714287"
                                    y="0"
                                />
                                <rect
                                    height="18.666666666666664"
                                    width="4.114285714285707"
                                    fill="#e74c3c"
                                    x="21.942857142857147"
                                    y="9.333333333333336"
                                />
                                <rect
                                    height="15.555555555555557"
                                    width="4.114285714285707"
                                    fill="#e74c3c"
                                    x="28.800000000000004"
                                    y="12.444444444444443"
                                />
                                <rect
                                    height="28"
                                    width="4.114285714285707"
                                    fill="#e74c3c"
                                    x="35.65714285714286"
                                    y="0"
                                />
                                <rect
                                    height="21.77777777777778"
                                    width="4.114285714285707"
                                    fill="#e74c3c"
                                    x="42.51428571428572"
                                    y="6.222222222222221"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-1/3 px-2">
      <div className="bg-white border-gray-300 p-4 mb-5 transition-all duration-300 ease-in-out shadow-lg">
        <div className="flex items-center flex-wrap -mx-2">
          <div className="w-3/4 px-2">
            <p className="text-gray-600 text-sm mb-4">
              <span>Tickets Completed</span>
            </p>
            <h2 className="text-2xl font-medium text-gray-900 mb-2">--%</h2>
          </div>
          <div className="w-1/4 px-2 text-center">
            <div className="shadow-lg">
              <span className="hidden">5,3,9,6,5,9,7</span>
              <svg
                height="24"
                width="24"
                className="inline-block align-middle"
              >
                <path
                  d="M 12 0 A 12 12 0 1 1 11.99 0 L 11.99 6 A 6 6 0 1 0 12 6"
                  fill="#ccc"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

        </>
    );
}
