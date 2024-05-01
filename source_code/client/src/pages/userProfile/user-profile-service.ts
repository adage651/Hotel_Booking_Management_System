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
      {
        dataField: 'position',
        editorType: 'dxSelectBox',
        colSpan: 2,
        editorOptions: {
          items: ['Designer', 'Developer', 'Technical Writer'],
        }
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
        editorOptions: {
          mask: '+1(000)000-0000',
        }
      },
      {
        dataField: 'email',
        validators: [
          { type: 'email' }
        ] as ValidationRule[]
      },
      {
        dataField: 'domainUsername',
        colSpan: 2,
      },
      {
        dataField: 'status',
        colSpan: 2,
      },
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
      {
        dataField: 'address',
        colSpan: 2,
      },
      {
        dataField: 'zipCode',
        editorType: 'dxNumberBox',
        colSpan: 2,
      },
    ];
  }
};