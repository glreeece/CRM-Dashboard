import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import MainLayout from './../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import AuthGuard from './../utils/route-guard/AuthGuard';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));

// utilities routing
// const UtilsTypography = Loadable(lazy(() => import('../views/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('../views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('../views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('../views/utilities/TablerIcons')));

// contacts routing
const ContactsPeople = Loadable(lazy(() => import('../views/contacts/ContactsPeople')));
const ContactsCompany = Loadable(lazy(() => import('../views/contacts/ContactsCompany')));
// engages routing
const Sequences = Loadable(lazy(() => import('../views/engages/Sequences')));
const Emails = Loadable(lazy(() => import('../views/engages/Emails')));
const Templates = Loadable(lazy(() => import('../views/engages/templates/Templates')));
const AddTemplates = Loadable(lazy(() => import('../views/engages/templates/AddTemplates')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('../views/sample-page')));

//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
    const location = useLocation();

    return (
        <Route
            path={[
                '/dashboard/default',

                // '/utils/util-typography',
                // '/utils/util-color',
                // '/utils/util-shadow',
                '/contacts/people',
                '/contacts/company',
                '/engages/sequences',
                '/engages/emails',
                '/engages/templates',
                // '/engages/newtemplates',
                '/icons/tabler-icons',
                '/icons/material-icons',

                // '/sample-page'
            ]}
        >
            <MainLayout>
                <Switch location={location} key={location.pathname}>
                    <AuthGuard>
                        <Route path="/dashboard/default" component={DashboardDefault} />

                        {/* <Route path="/utils/util-typography" component={UtilsTypography} />
                        <Route path="/utils/util-color" component={UtilsColor} />
                        <Route path="/utils/util-shadow" component={UtilsShadow} /> */}
                        <Route path="/contacts/people" component={ContactsPeople} />
                        <Route path="/contacts/company" component={ContactsCompany} />
                        <Route path="/engages/sequences" component={Sequences} />
                        <Route path="/engages/emails" component={Emails} />
                        <Route path="/engages/templates" component={Templates} />
                        {/* <Route path="/engages/newtemplates" component={AddTemplates} /> */}
                        <Route path="/icons/tabler-icons" component={UtilsTablerIcons} />
                        <Route path="/icons/material-icons" component={UtilsMaterialIcons} />

                        <Route path="/sample-page" component={SamplePage} />
                    </AuthGuard>
                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;
