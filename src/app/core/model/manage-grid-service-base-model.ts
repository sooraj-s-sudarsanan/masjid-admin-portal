import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
export class ManageGridServiceBaseModel {
    public static data = [
        {
            section: ModuleKeyModel.networkManagement.key,
            createServiceId: 'ADM_ADD_NETWORK',
            updateServiceId: 'ADM_UPDATE_NETWORK',
            deleteServiceId: 'ADM_DELETE_NETWORK_BYID',
            listServiceId: 'ADM_LIST_NETWORKS_PAGINATED'
        },
        {
            section: ModuleKeyModel.merchant.key,
            createServiceId: 'ADM_ADD_MERCHANT',
            updateServiceId: 'ADM_UPDATE_MERCHANT',
            deleteServiceId: 'ADM_DELETE_MERCHANT_BYID',
            listServiceId: 'ADM_LIST_MERCHANT_PAGINATED'
        },
        {
            section: ModuleKeyModel.branch.key,
            createServiceId: 'ADM_ADD_MERCHANT_BRANCH',
            updateServiceId: 'ADM_UPDATE_MERCHANT_BRANCH',
            deleteServiceId: 'ADM_DELETE_MERCHANT_BRANCH_BYID',
            listServiceId: 'ADM_LIST_MERCHANT_BRANCH_PAGINATED'
        },
        {
            section: ModuleKeyModel.service.key,
            createServiceId: 'ADM_ADD_SERVICE',
            updateServiceId: 'ADM_UPDATE_SERVICE',
            deleteServiceId: 'ADM_DELETE_SERVICE_BYID',
            listServiceId: 'ADM_LIST_SERVICE_PAGINATED'
        },
        {
            section: ModuleKeyModel.servicePerson.key,
            createServiceId: 'ADM_UPDATE_SERVICE_MAPPING',
            updateServiceId: 'ADM_UPDATE_SERVICE_MAPPING',
            deleteServiceId: '',
            listServiceId: 'ADM_LIST_SERVICE_MAPPING'
        },
        {
            section: ModuleKeyModel.menuManagement.key,
            createServiceId: 'ADM_ADD_MENU',
            updateServiceId: 'ADM_UPDATE_MENU',
            deleteServiceId: 'ADM_DELETE_MENU_BYID',
            listServiceId: 'ADM_LIST_MENU_PAGINATED'
        },
        {
            section: ModuleKeyModel.mapping.key,
            createServiceId: 'ADM_ADD_SERVICE_MAPPING',
            updateServiceId: 'ADM_UPDATE_SERVICE_MAPPING',
            deleteServiceId: 'ADM_DELETE_SERVICE_MAPPING',
            listServiceId: 'ADM_LIST_SERVICE_MAPPING_PAGINATED'
        },
        {
            section: ModuleKeyModel.module.key,
            createServiceId: 'ADM_ADD_MODULE',
            updateServiceId: 'ADM_UPDATE_MODULE',
            deleteServiceId: 'ADM_DELETE_MODULE_BYID',
            listServiceId: 'ADM_LIST_MODULE_PAGINATED'
        },
        {
            section: ModuleKeyModel.subModule.key,
            createServiceId: 'ADM_ADD_SUBMODULE',
            updateServiceId: 'ADM_UPDATE_SUBMODULE',
            deleteServiceId: 'ADM_DELETE_SUBMODULE_BYID',
            listServiceId: 'ADM_LIST_SUBMODULE_PAGINATED'
        },
        {
            section: ModuleKeyModel.roleManagement.key,
            createServiceId: 'ADM_ADD_ROLE',
            updateServiceId: 'ADM_UPDATE_ROLE',
            deleteServiceId: 'ADM_DELETE_ROLE_BYID',
            listServiceId: 'ADM_LIST_ROLES_PAGINATED'
        },
        {
            section: ModuleKeyModel.adminUserManagement.key,
            createServiceId: 'ADM_ADD_ADMINUSER',
            updateServiceId: 'ADM_UPDATE_ADMINUSER',
            deleteServiceId: 'ADM_DELETE_ADMINUSER',
            listServiceId: 'ADM_LIST_ADMIN_USER'
        },
        {
            section: ModuleKeyModel.pageName.key,
            createServiceId: 'ADM_ADD_STATIC_PAGENAME',
            updateServiceId: 'ADM_UPDATE_STATIC_PAGENAME',
            deleteServiceId: 'ADM_DELETE_STATIC_PAGENAME',
            listServiceId: 'ADM_LIST_STATIC_PAGENAMES'
        },
        {
            section: ModuleKeyModel.pageData.key,
            createServiceId: 'ADM_ADD_STATIC_DATA',
            updateServiceId: 'ADM_UPDATE_STATIC_DATA',
            deleteServiceId: 'ADM_DELETE_STATIC_DATA',
            listServiceId: 'ADM_LIST_STATIC_DATA'
        },
        {
            section: ModuleKeyModel.category.key,
            createServiceId: 'ADM_ADD_CATEGORY',
            updateServiceId: 'ADM_UPDATE_CATEGORY',
            deleteServiceId: 'ADM_DELETE_CATEGORY_BYID',
            listServiceId: 'ADM_LIST_CATEGORY_PAGINATED'
        },
        {
            section: ModuleKeyModel.serviceModule.key,
            createServiceId: 'ADM_ADD_SERVICE',
            updateServiceId: 'ADM_UPDATE_SERVICE',
            deleteServiceId: 'ADM_DELETE_SERVICE_BYID',
            listServiceId: 'ADM_LIST_SERVICE'
        },
        {
            section: ModuleKeyModel.countryModule.key,
            createServiceId: 'ADM_ADD_NATIONALITY',
            updateServiceId: 'ADM_ADD_NATIONALITY',
            deleteServiceId: 'ADM_DELETE_NATIONALITY',
            listServiceId: 'ADM_LIST_NATIONALITY'
        },
        {
            section: ModuleKeyModel.localityModule.key,
            createServiceId: 'ADM_ADD_LOCALITY',
            updateServiceId: 'ADM_UPDATE_LOCALITY',
            deleteServiceId: 'ADM_DELETE_LOCALITY',
            listServiceId: 'ADM_LIST_LOCALITIES'
        },
        {
            section: ModuleKeyModel.faqCategoryModule.key,
            createServiceId: 'ADM_ADD_FAQTYPES',
            updateServiceId: 'ADM_UPDATE_FAQTYPES',
            deleteServiceId: 'ADM_DELETE_FAQTYPES',
            listServiceId: 'ADM_LIST_FAQTYPES'
        },
        {
            section: ModuleKeyModel.faq.key,
            createServiceId: 'ADM_ADD_FAQ',
            updateServiceId: 'ADM_UPDATE_FAQ',
            deleteServiceId: 'ADM_DELETE_FAQ',
            listServiceId: 'ADM_LIST_FAQS'
        },
        {
            section: ModuleKeyModel.appointment.key,
            createServiceId: 'ADM_ADD_BOOKING',
            updateServiceId: 'CST_UPDATE_BOOKING',
            deleteServiceId: 'ADM_DELETE_BOOKING',
            listServiceId: 'ADM_LIST_BOOKING_PAGINATED'
        },
        {
            section: ModuleKeyModel.offerType.key,
            createServiceId: 'ADM_ADD_OFFERTYPE',
            updateServiceId: 'ADM_UPDATE_OFFERTYPE',
            deleteServiceId: 'ADM_DELETE_OFFERTYPE',
            listServiceId: 'ADM_LIST_OFFERTYPE'
        },
        {
            section: ModuleKeyModel.offer.key,
            createServiceId: 'ADM_ADD_OFFER',
            updateServiceId: 'ADM_UPDATE_OFFER',
            deleteServiceId: 'ADM_DELETE_OFFER',
            listServiceId: 'ADM_LIST_OFFER'
        },
        {
            section: ModuleKeyModel.offerMapping.key,
            createServiceId: 'ADM_ADD_MENU',
            updateServiceId: 'ADM_UPDATE_MENU',
            deleteServiceId: 'ADM_DELETE_MENU_BYID',
            listServiceId: 'ADM_LIST_SERVICE_MAPPING'
        },
        {
            section: ModuleKeyModel.fileData.key,
            createServiceId: 'ADM_ADD_FILEDATA',
            updateServiceId: 'ADM_ADD_FILEDATA',
            deleteServiceId: 'ADM_DELE_TEFILEDATABYID',
            listServiceId: 'ADM_LIST_FILEDATA_PAGINATION'
        },
        {
            section: ModuleKeyModel.employee.key,
            createServiceId: 'ADM_ADD_SERVICE_PERSON',
            updateServiceId: 'ADM_UPDATE_SERVICE_PERSON',
            deleteServiceId: 'ADM_DELETE_SERVICE_PERSON',
            listServiceId: 'ADM_LIST_SERVICEPERSON_PAGINATED'
        },
        {
            section: ModuleKeyModel.features.key,
            createServiceId: 'ADM_ADD_FEATURE',
            updateServiceId: 'ADM_UPDATE_FEATURE',
            deleteServiceId: 'ADM_DELETE_FEATURE',
            listServiceId: 'ADM_LIST_FEATURE'
        },
        {
            section: ModuleKeyModel.notificationGroup.key,
            createServiceId: 'ADM_ADD_NOTIFICATIONGROUP',
            updateServiceId: 'ADM_UPDATE_NOTIFICATIONGROUP',
            deleteServiceId: 'ADM_DELETE_NOTIFICATIONGROUP',
            listServiceId: 'ADM_LIST_NOTIFICATIONGROUP'
        },
        {
            section: ModuleKeyModel.notifications.key,
            createServiceId: 'ADM_ADD_NOTIFICATIONDETAILS',
            updateServiceId: 'ADM_UPDATE_NOTIFICATIONDETAILS',
            deleteServiceId: 'ADM_DELETE_NOTIFICATIONDETAILSBYID',
            listServiceId: 'ADM_LIST_NOTIFICATIONDETAILS_PAGINATED'
        },
        {
            section: ModuleKeyModel.appManagement.key,
            createServiceId: 'ADM_ADDORUPDATE_APPDETAIL',
            updateServiceId: 'ADM_ADDORUPDATE_APPDETAIL',
            deleteServiceId: '',
            listServiceId: 'ADM_GET_APP_DETAIL'
        },        
        {
            section: ModuleKeyModel.loyalityType.key,
            createServiceId: 'ADM_ADD_LOYALTY_TYPE',
            updateServiceId: 'ADM_UPDATE_LOYALTY_TYPE',
            deleteServiceId: 'ADM_DELETE_LOYALTY_TYPE',
            listServiceId: 'ADM_LIST_LOYALTY_TYPE_PAGED'
        },
        {
            section: ModuleKeyModel.loyalityScheme.key,
            createServiceId: 'ADM_ADD_LOYALTY_SCHEME',
            updateServiceId: 'ADM_UPDATE_LOYALTY_SCHEME',
            deleteServiceId: 'ADM_DELETE_LOYALTY_SCHEME',
            listServiceId: 'ADM_LIST_LOYALTY_SCHEME_PAGED'
        },
        {
            section: ModuleKeyModel.loyalityRule.key,
            createServiceId: 'ADM_ADD_LOYALTY_RULE',
            updateServiceId: 'ADM_UPDATE_LOYALTY_RULE',
            deleteServiceId: 'ADM_DELETE_LOYALTY_RULE',
            listServiceId: 'ADM_LIST_LOYALTY_RULE_PAGED'
        },
        {
            section: ModuleKeyModel.loyalityRuleMapping.key,
            createServiceId: 'ADM_ADD_LOYALTY_RULE_MAPPING',
            updateServiceId: 'ADM_UPDATE_LOYALTY_RULE_MAPPING',
            deleteServiceId: 'ADM_DELETE_LOYALTY_RULE_MAPPING_BYID',
            listServiceId: 'ADM_LIST_LOYALTY_RULE_MAPPINGPAGED'
        },
        {
            section: ModuleKeyModel.taxType.key,
            createServiceId: 'ADM_ADD_TAX_TYPE',
            updateServiceId: 'ADM_UPDATE_TAX_TYPE',
            deleteServiceId: 'ADM_DELETE_TAX_TYPE',
            listServiceId: 'ADM_LIST_TAX_TYPE'
        },
        {
            section: ModuleKeyModel.taxComponents.key,
            createServiceId: 'ADM_ADD_TAX_COMPONENT',
            updateServiceId: 'ADM_UPDATE_TAX_COMPONENT',
            deleteServiceId: 'ADM_DELETE_COMPONENT_BYID',
            listServiceId: 'ADM_LIST_TAX_COMPONENT_PAGED'
        },
        {
            section: ModuleKeyModel.taxMapping.key,
            createServiceId: 'ADM_ADD_TAX_SERVICE_MAPPING',
            updateServiceId: 'ADM_UPDATE_TAX_SERVICE_MAPPING',
            deleteServiceId: 'ADM_DELETE_SERVICE_MAPPING_TYPE',
            listServiceId: 'ADM_LIST_TAX_SERVICE_MAPPING_PAGED'
        },
        {
            section: ModuleKeyModel.reportType.key,
            createServiceId: 'ADM_ADD_REPORT_TYPE',
            updateServiceId: 'ADM_UPDATE_REPORT_TYPE',
            deleteServiceId: 'ADM_DELETE_REPORT_TYPE',
            listServiceId: 'ADM_LIST_REPORT_TYPE_PAGED'
        },
        {
            section: ModuleKeyModel.reportConfig.key,
            createServiceId: 'ADM_ADD_REPORT_CONFIG',
            updateServiceId: 'ADM_UPDATE_REPORT_CONFIG',
            deleteServiceId: 'ADM_DELETE_REPORT_CONFIG',
            listServiceId: 'ADM_LIST_REPORT_CONFIG_PAGED'
        }
    ];
}
