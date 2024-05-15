import {io} from "socket.io-client"
const Conformation =()=>{
    return(
    <div class="card">
        <div class="flex flex-column sm:flex-row sm:justify-content-between sm:align-items-center"><span
                class="text-2xl font-medium text-900">Thanks for your order!</span>
            <div class="flex mt-3 sm:mt-0">
                <div class="flex flex-column align-items-center"><span class="text-900 font-medium mb-2">Order
                        ID</span><span class="text-700">451234</span></div>
                <div class="flex flex-column align-items-center ml-6 md:ml-8"><span
                        class="text-900 font-medium mb-2">Order Date</span><span class="text-700">7 Feb 2023</span>
                </div>
            </div>
        </div>
        <div class="flex flex-column md:flex-row md:align-items-center border-bottom-1 surface-border py-5"><img
                src="assets/images/icons/room.png" class="w-15rem flex-shrink-0 md:mr-6"
                alt="summary-1-2" />
            <div class="flex-auto mt-3 md:mt-0"><span class="text-xl text-900">Product Name</span>
                <div class="font-medium text-2xl text-900 mt-3 mb-5">Order Processing</div>
                <div class="border-round overflow-hidden surface-300 mb-3" style={{height: "7px;"}}>
                    <div class="bg-primary border-round w-4 h-full"></div>
                </div>
                <div class="flex w-full justify-content-between"><span
                        class="text-900 text-xs sm:text-base">Ordered</span><span
                        class="text-900 font-medium text-xs sm:text-base">Processing</span><span
                        class="text-500 text-xs sm:text-base">Shipping</span><span
                        class="text-500 text-xs sm:text-base">Delivered</span></div>
            </div>
        </div>
        <div class="py-5 flex justify-content-between flex-wrap">
            <div class="flex sm:mr-5 mb-5"><span class="font-medium text-900 text-xl mr-8">Product Name</span><span
                    class="text-900 text-xl">$21.00</span></div>
            <div class="flex flex-column sm:mr-5 mb-5"><span class="font-medium text-900 text-xl">Shipping
                    Address</span>
                <div class="flex flex-column text-900 mt-3"><span class="mb-1">Celeste Slater</span><span
                        class="mb-1">606-3727 Ullamcorper. Roseville NH 11523</span><span>(786) 713-8616</span></div>
            </div>
            <div class="flex flex-column"><span class="font-medium text-900 text-xl">Payment</span>
                <div class="flex align-items-center mt-3"><img src="assets/images/icons/google.svg"
                        class="w-4rem mr-3" alt="visa-2" />
                    <div class="flex flex-column"><span class="text-900 mb-1">Visa Debit Card</span><span
                            class="text-900 font-medium">**** **** **** 1234</span></div>
                </div>
            </div>
        </div>
         </div>)
}
export default Conformation