const Practice =()=>{
    return(
         <div class="flex flex-column md:flex-row gap-5" style={{minHeight: "81vh;"}}>
        <div class="md:w-25rem card p-0">
            <div class="flex flex-column align-items-center border-bottom-1 surface-border p-6">
                <img
                    src="/assets/images/avatars/avatar_4.jpg" class="w-6rem h-6rem border-circle shadow-4"
                    alt="Asiya Javayant" />
            <span class="text-900 text-xl font-semibold mt-4">Asiya Javayant</span>
            </div>
            <div class="w-full flex row-gap-4 flex-column surface-border p-4"><span class="p-input-icon-left w-full"><i
                        class="pi pi-search"></i>
                        <input class="p-inputtext p-component w-full w-full" id="search"
                        placeholder="Search" data-pc-name="inputtext" data-pc-section="root" type="text"
                        value="" />
                    </span>
                <div class="flex flex-row gap-4 md:flex-column overflow-auto">
                    <div class="flex flex-nowrap justify-content-between align-items-center border-1 surface-border border-round p-3 cursor-pointer select-none hover:surface-hover transition-colors transition-duration-150"
                        tabindex="0">
                        <div class="flex align-items-center">
                            <div class="relative md:mr-3"><img src="/assets/images/avatars/avatar_3.jpg"
                                    alt="props.user" class="w-3rem h-3rem border-circle shadow-4" />
                                        <span
                                    class="w-1rem h-1rem border-circle border-2 surface-border absolute bg-green-400 bg-yellow-400"
                                    style={{bottom: "2px;", right: "2px;"}}>
                                        </span></div>
                            <div class="flex-column hidden md:flex"><span class="text-900 font-semibold block">Ioni
                                    Bowcher</span><span
                                    class="block text-600 text-overflow-ellipsis overflow-hidden white-space-nowrap w-10rem text-sm">Sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua</span></div>
                        </div><span class="text-700 font-semibold ml-auto hidden md:inline">2d</span>
                    </div>
                    <div class="flex flex-nowrap justify-content-between align-items-center border-1 surface-border border-round p-3 cursor-pointer select-none hover:surface-hover transition-colors transition-duration-150"
                        tabindex="0">
                        <div class="flex align-items-center">
                            <div class="relative md:mr-3">
                                <img src="/assets/images/avatars/avatar_2.jpg"
                                    alt="props.user" class="w-3rem h-3rem border-circle shadow-4" /><span
                                    class="w-1rem h-1rem border-circle border-2 surface-border absolute bg-yellow-400"
                                    style={{bottom: "2px;" ,right: "2px;"}}></span></div>
                            <div class="flex-column hidden md:flex"><span class="text-900 font-semibold block">Stephen
                                    Shaw</span><span
                                    class="block text-600 text-overflow-ellipsis overflow-hidden white-space-nowrap w-10rem text-sm">Consequat
                                    mauris nunc congue nisi vitae suscipit.</span></div>
                        </div><span class="text-700 font-semibold ml-auto hidden md:inline">2d</span>
                    </div>
                    <div class="flex flex-nowrap justify-content-between align-items-center border-1 surface-border border-round p-3 cursor-pointer select-none hover:surface-hover transition-colors transition-duration-150"
                        tabindex="0">
                        <div class="flex align-items-center">
                            <div class="relative md:mr-3"><img src="/assets/images/avatars/avatar_1.jpg" alt="props.user"
                                    class="w-3rem h-3rem border-circle shadow-4" /><span
                                    class="w-1rem h-1rem border-circle border-2 surface-border absolute bg-red-400 bg-yellow-400"
                                    style={{bottom:"2px;", right: "2px;"}}></span></div>
                            <div class="flex-column hidden md:flex"><span class="text-900 font-semibold block">Xuxue
                                    Feng</span><span
                                    class="block text-600 text-overflow-ellipsis overflow-hidden white-space-nowrap w-10rem text-sm">Adipiscing
                                    tristique risus nec feugiat in fermentum posuere urna nec.</span></div>
                        </div><span class="text-700 font-semibold ml-auto hidden md:inline">2d</span>
                    </div>
                    <div class="flex flex-nowrap justify-content-between align-items-center border-1 surface-border border-round p-3 cursor-pointer select-none hover:surface-hover transition-colors transition-duration-150"
                        tabindex="0">
                        <div class="flex align-items-center">
                            <div class="relative md:mr-3"><img src="/assets/images/avatars/avatar_6.jpg"
                                    alt="props.user" class="w-3rem h-3rem border-circle shadow-4" /><span
                                    class="w-1rem h-1rem border-circle border-2 surface-border absolute bg-green-400 bg-yellow-400"
                                    style={{bottom: "2px;" ,right: "2px;"}}></span></div>
                            <div class="flex-column hidden md:flex"><span class="text-900 font-semibold block">Ivan
                                    Magalhaes</span><span
                                    class="block text-600 text-overflow-ellipsis overflow-hidden white-space-nowrap w-10rem text-sm">Quis
                                    nostrud exercitation ullamco laboris nisi ut</span></div>
                        </div><span class="text-700 font-semibold ml-auto hidden md:inline">2d</span>
                    </div>
                    <div class="flex flex-nowrap justify-content-between align-items-center border-1 surface-border border-round p-3 cursor-pointer select-none hover:surface-hover transition-colors transition-duration-150"
                        tabindex="0">
                        <div class="flex align-items-center">
                            <div class="relative md:mr-3"><img src="/assets/images/avatars/avatar_7.jpg"
                                    alt="props.user" class="w-3rem h-3rem border-circle shadow-4" /><span
                                    class="w-1rem h-1rem border-circle border-2 surface-border absolute bg-red-400 bg-yellow-400"
                                    style={{bottom: "2px;" ,right: "2px;"}}></span></div>
                            <div class="flex-column hidden md:flex"><span class="text-900 font-semibold block">Onyama
                                    Limba</span><span
                                    class="block text-600 text-overflow-ellipsis overflow-hidden white-space-nowrap w-10rem text-sm">Excepteur
                                    sint occaecat cupidatat non proident</span></div>
                        </div><span class="text-700 font-semibold ml-auto hidden md:inline">2d</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-1 card p-0">
            <div class="flex flex-column h-full">
                <div class="flex align-items-center border-bottom-1 surface-border p-3 lg:p-6">
                    <div class="relative flex align-items-center mr-3"><img src="/assets/images/avatars/avatar_8.jpg"
                            alt="Ioni Bowcher" class="w-4rem h-4rem border-circle shadow-4" /><span
                            class="w-1rem h-1rem border-circle border-2 surface-border absolute bottom-0 right-0 bg-green-400"></span>
                    </div>
                    <div class="mr-2"><span class="text-900 font-semibold block">Ioni Bowcher</span><span
                            class="text-700">Last active 1 hour ago</span></div>
                    <div class="flex align-items-center ml-auto"><button
                            class="mr-3 p-button p-component p-button-icon-only p-button-outlined p-button-rounded p-button-secondary"
                            type="button" data-pc-name="button" data-pc-section="root"><span
                                class="p-button-icon p-c pi pi-phone" data-pc-section="icon"></span><span
                                class="p-button-label p-c" data-pc-section="label">&nbsp;</span><span
                                role="presentation" aria-hidden="true" class="p-ink" data-pc-name="ripple"
                                data-pc-section="root"
                                style={{height: "32.9844px;" ,width: "32.9844px;"}}></span></button><button
                            class="p-button p-component p-button-icon-only p-button-outlined p-button-rounded p-button-secondary"
                            type="button" data-pc-name="button" data-pc-section="root"><span
                                class="p-button-icon p-c pi pi-ellipsis-v" data-pc-section="icon"></span><span
                                class="p-button-label p-c" data-pc-section="label">&nbsp;</span><span
                                role="presentation" aria-hidden="true" class="p-ink" data-pc-name="ripple"
                                data-pc-section="root" style={{height: "32.9844px;", width: "32.9844px;"}}></span></button>
                    </div>
                </div>
                <div class="p-3 md:px-4 lg:px-6 lg:py-4 mt-2 overflow-y-auto" style={{maxHeight: "53vh;"}}>
                    <div>
                        <div class="grid grid-nogutter mb-4">
                            <div class="mr-3 mt-1"><img src="/assets/images/avatars/avatar_7.jpg" alt="Ioni Bowcher"
                                    class="w-3rem h-3rem border-circle shadow-4" /></div>
                            <div class="col mt-3">
                                <p class="text-900 font-semibold mb-3">Ioni Bowcher</p><span
                                    class="text-700 inline-block font-medium border-1 surface-border p-3 white-space-normal border-round"
                                    style={{wordBreak: "break-word;" , maxWidth: "80%;"}}>Lorem ipsum dolor sit amet,
                                    consectetur adipiscing elit</span>
                                <p class="text-700 mt-3">23:25<i class="pi pi-check ml-2 text-green-400"></i></p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="grid grid-nogutter mb-4">
                            <div class="mr-3 mt-1"><img src="/assets/images/avatars/avatar_5.jpg" alt="Ioni Bowcher"
                                    class="w-3rem h-3rem border-circle shadow-4" /></div>
                            <div class="col mt-3">
                                <p class="text-900 font-semibold mb-3">Ioni Bowcher</p><span
                                    class="text-700 inline-block font-medium border-1 surface-border p-3 white-space-normal border-round"
                                    style={{wordBreak: "break-word", maxWidth: "80%;"}}>Sed do eiusmod tempor incididunt ut
                                    labore et dolore magna aliqua</span>
                                <p class="text-700 mt-3">23:26<i class="pi pi-check ml-2 text-green-400"></i></p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="grid grid-nogutter mb-4">
                            <div class="col mt-3 text-right"><span
                                    class="inline-block text-left font-medium border-1 surface-border bg-primary-100 text-primary-900 p-3 white-space-normal border-round"
                                    style={{wordBreak: "break-word; ", maxWidth: "80%;"}}>Sed do eiusmod tempor incididunt ut
                                    labore et dolore magna aliqua</span>
                                <p class="text-700 mt-3">23:26 <i class="pi pi-check ml-2 text-green-400"></i></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="p-3 md:p-4 lg:p-6 flex flex-column sm:flex-row align-items-center mt-auto border-top-1 surface-border gap-3">
                    <input
                        class="p-inputtext p-component flex-1 w-full sm:w-auto border-round flex-1 w-full sm:w-auto border-round"
                        id="message" placeholder="Type a message" data-pc-name="inputtext" data-pc-section="root"
                        type="text" value="" />
                    <div class="flex w-full sm:w-auto gap-3"><button
                            class="w-full sm:w-auto justify-content-center text-xl p-button p-component p-button-secondary"
                            data-pc-name="button" data-pc-section="root">😀<span role="presentation" aria-hidden="true"
                                class="p-ink" data-pc-name="ripple" data-pc-section="root"
                                style={{height: "52px;", width: "52px;"}}></span></button><button aria-label="Send"
                            class="w-full sm:w-auto p-button p-component" data-pc-name="button"
                            data-pc-section="root"><span class="p-button-icon p-c p-button-icon-left pi pi-send"
                                data-pc-section="icon"></span><span class="p-button-label p-c"
                                data-pc-section="label">Send</span><span role="presentation" aria-hidden="true"
                                class="p-ink" data-pc-name="ripple" data-pc-section="root"
                                style={{height: "83.125px;" ,width: "83.125px;"}}></span>
                            </button>
                            </div>
                </div>
            </div>
        </div>
         </div>
)
}
export default Practice