// assets
import { IconBrandFramer, IconTypography, IconPalette, IconShadow, IconWindmill, IconLayoutGridAdd, IconUsers, IconDashboard, IconDeviceAnalytics } from '@tabler/icons';
import {DashboardRounded, PeopleAltRounded, Business, PersonSearchRounded, PeopleOutlineRounded, BadgeRounded, BeenhereRounded, AssignmentRounded, SubjectRounded, EmailRounded, TtyRounded, VideoCameraFrontRounded, TroubleshootRounded, SettingsInputSvideoRounded, SellRounded, MonetizationOnRounded, Task} from '@mui/icons-material';
// constant
const icons = {
    // IconTypography: IconTypography,
    // IconPalette: IconPalette,
    // IconShadow: IconShadow,
    // IconWindmill: IconWindmill,
    // IconBrandFramer: IconBrandFramer,
    // IconLayoutGridAdd: IconLayoutGridAdd,
    IconDashboard: DashboardRounded,
    IconUsers: PeopleAltRounded,
    IconCompany: Business,
    IconPeople: PersonSearchRounded,
    IconManage: PeopleOutlineRounded,
    IconContacts: BadgeRounded,
    IconEngage: BeenhereRounded,
    IconSequence: AssignmentRounded,
    IconTemplate: SubjectRounded,
    IconEmail: EmailRounded,
    IconCall:TtyRounded,
    IconMeeting: VideoCameraFrontRounded,
    IconAnalytic: TroubleshootRounded,
    IconSetting: SettingsInputSvideoRounded,
    IconPipline: SellRounded,
    IconDeal: MonetizationOnRounded,
    IconTask: Task
};

//-----------------------|| leads MENU ITEMS ||-----------------------//

export const menus = {
    id: 'menus',
    title: '',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: icons['IconDashboard'],
            breadcrumbs: true
        },
        {
            id: 'contacts',
            title: 'Contacts',
            type: 'collapse',
            icon: icons['IconContacts'],
            children: [
                {
                    id: 'contacts-people',
                    title: 'People',
                    type: 'item',
                    url: '/contacts/people',
                    icon: icons['IconUsers'],
                    breadcrumbs: true
                },
                {
                    id: 'contacts-company',
                    title: 'Companies',
                    type: 'item',
                    url: '/contacts/company',
                    icon: icons['IconCompany'],
                    breadcrumbs: true
                }
            ]
        },
        {
            id: 'engages',
            title: 'Engages',
            type: 'collapse',
            icon: icons['IconEngage'],
            children: [
                {
                    id: 'engages-sequences',
                    title: 'Sequences',
                    type: 'item',
                    url: '/engages/sequences',
                    icon: icons['IconSequence'],
                    breadcrumbs: true
                },
                {
                    id: 'engages-templates',
                    title: 'Templates',
                    type: 'item',
                    url: '/engages/templates',
                    icon: icons['IconTemplate'],
                    breadcrumbs: true
                },
                {
                    id: 'engages-emails',
                    title: 'Emails',
                    type: 'item',
                    url: '/engages/emails',
                    icon: icons['IconEmail'],
                    breadcrumbs: true
                },
                {
                    id: 'engages-calls',
                    title: 'Calls',
                    type: 'item',
                    url: '/engages/calls',
                    icon: icons['IconCall'],
                    breadcrumbs: true
                },
                {
                    id: 'engages-tasks',
                    title: 'Tasks',
                    type: 'item',
                    url: '/engages/tasks',
                    icon: icons['IconTask'],
                    breadcrumbs: true
                },
                {
                    id: 'engages-meetings',
                    title: 'Meetings',
                    type: 'item',
                    url: '/engages/meetings',
                    icon: icons['IconMeeting'],
                    breadcrumbs: true
                },
                {
                    id: 'engages-analytics',
                    title: 'Analytics',
                    type: 'item',
                    url: '/engages/analytics',
                    icon: icons['IconAnalytic'],
                    breadcrumbs: true
                },
                {
                    id: 'engages-settings',
                    title: 'Settings',
                    type: 'item',
                    url: '/engages/settings',
                    icon: icons['IconSetting'],
                    breadcrumbs: true
                }
            ]
        },
        
        {
            id: 'pipline',
            title: 'PipeLine',
            type: 'item',
            url: '/pipeline',
            icon: icons['IconPipline'],
            breadcrumbs: true
        },

        {
            id: 'deals',
            title: 'Deals',
            type: 'item',
            url: '/deals',
            icon: icons['IconDeal'],
            breadcrumbs: true
        },
        
        {
            id: 'icons',
            title: 'Icons',
            type: 'collapse',
            icon: icons['IconWindmill'],
            children: [
                {
                    id: 'tabler-icons',
                    title: 'Tabler Icons',
                    type: 'item',
                    url: '/icons/tabler-icons',
                    breadcrumbs: true
                },
                {
                    id: 'material-icons',
                    title: 'Material Icons',
                    type: 'item',
                    url: '/icons/material-icons',
                    breadcrumbs: true
                }
            ]
        }
    ]
};
