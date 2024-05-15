
import React, { useRef } from 'react'; 
import { Panel } from 'primereact/panel';
import { Avatar } from 'primereact/Avatar';
import { Menu } from 'primereact/Menu';
import { Button } from 'primereact/Button';

export default function TemplateDemo({retrievedDate,userData}) {
    const configMenu = useRef(null);

const currentDate = new Date();
const absoluteDifference = Math.abs(retrievedDate.getTime() - currentDate.getTime());


const hours = Math.floor(absoluteDifference / (60 * 60 * 1000));
const minutes = Math.floor((absoluteDifference % (60 * 60 * 1000)) / (60 * 1000));

let updateString;

if (hours > 0) {
  updateString = `Updated ${hours} hour${hours > 1 ? 's' : ''} ago`;
} else if (minutes > 0) {
  updateString = `Updated ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
} else {
  updateString = 'Just now';
}













    const items = [
        {
            label: 'Refresh',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Search',
            icon: 'pi pi-search'
        },
        {
            separator: true
        },
        {
            label: 'Delete',
            icon: 'pi pi-times'
        }
    ];

    const headerTemplate = (options) => {
        const className = `${options.className} justify-content-space-between`;

        return (
            <div className={className}>
                <div className="flex align-items-center gap-2">
                    <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" size="large" shape="circle" />
                    <span className="font-bold">Amy Elsner</span>
                </div>
                <div>
                    <Menu model={items} popup ref={configMenu} id="config_menu" />
                    <button className="p-panel-header-icon p-link mr-2" onClick={(e) => configMenu?.current?.toggle(e)}>
                        <span className="pi pi-cog"></span>
                    </button>
                    {options.togglerElement}
                </div>
            </div>
        );
    };

    const footerTemplate = (options) => {
        const className = `${options.className} flex flex-wrap align-items-center justify-content-between gap-3`;

        return (
            <div className={className}>
                <div className="flex align-items-center gap-2">
                    <Button icon="pi pi-user" rounded text></Button>
                    <Button icon="pi pi-bookmark" severity="secondary" rounded text></Button>
                </div>
                <span className="p-text-secondary">Updated 2 hours ago</span>
            </div>
        );
    };

    return (
        <Panel headerTemplate={headerTemplate} footerTemplate={footerTemplate} toggleable>
            <p className="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </Panel>
    )
}
        