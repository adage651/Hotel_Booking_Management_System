import { ValidationRule } from 'devextreme-react/common';
import { ProfileCardItem } from './ProfileCard';

export const service = {
  getBasicInfoItems(): ProfileCardItem[] {
    return [
      { dataField: 'firstName', colSpan: 2 },
      { dataField: 'lastName', colSpan: 2 },
      // {
      //   dataField: 'department',
      //   editorType: 'dxSelectBox',
      //   colSpan: 1,
      //   editorOptions: {
      //     items: ['UI/UX', 'Backend Developers'],
      //   }
      // },
      // {
      //   dataField: 'position',
      //   editorType: 'dxSelectBox',
      //   colSpan: 2,
      //   editorOptions: {
      //     items: ['receptionist','guest','manager','staff','maintainance'],
      //   }
      // },
            {
        dataField: 'domainUsername',
        colSpan: 2,
      },
      // {
      //   dataField: 'hiredDate',
      //   editorType: 'dxDateBox',
      //   colSpan: 1,
      //   editorOptions: {
      //     max: new Date(),
      //   }
      // },
      {
        dataField: 'birthDate',
        colSpan: 2,
        editorType: 'dxDateBox',
        editorOptions: {
          max: new Date(),
        }
      },

    ];
  },
  getContactItems(supervisorsList): ProfileCardItem[] {
    return [
      {
        dataField: 'phone',
        colSpan: 2,
        editorOptions: {
          mask: '+1(000)000-0000',
        }
      },
      {
        dataField: 'email',
        colSpan: 2,
        validators: [
          { type: 'email' }
        ] as ValidationRule[]
      },

      // {
      //   dataField: 'status',
      //   colSpan: 2,
      // },
      // {
      //   dataField: 'supervisor',
      //   label: 'Supervisor',
      //   colSpan: 2,
      //   itemsList: supervisorsList,
      //   editorType: 'dxSelectBox',
      // },
    ];
  },
  getAddressItems(): ProfileCardItem[] {
    return [
      { dataField: 'country' },
      { dataField: 'city' },
      {
        dataField: 'state',
        colSpan: 2,
        label: 'State/province/area',
        editorOptions: {
          label: 'State/province/area',
        }
      },
    ];
  }
};