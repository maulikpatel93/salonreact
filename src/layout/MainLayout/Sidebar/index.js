import { Link, NavLink } from "react-router-dom";
import config from "../../../config";
import { useTranslation } from "react-i18next";
const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <aside className="sidenav-bar">
      <div className="sidenav-logo py-4 text-center">
        <Link to={config.basePath + "/dashboard"}>
          <img src={config.imagepath + "logo-small.png"} alt="" />
        </Link>
      </div>
      <div className="sidemenu">
        <ul className="list-unstyled p-0 m-0 text-center">
          <li>
            <NavLink to={config.basePath + "/dashboard"} data-bs-toggle="tooltip" data-bs-placement="right" title={t('Dashboard')}>
              <span className="icon">
                <img src={config.imagepath + "dashboard.png"} alt="" />
              </span>
              <span className="d-lg-none ps-3">{t('Dashboard')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={config.basePath + "/calendar"} data-bs-toggle="tooltip" data-bs-placement="right" title={t('Calendar')}>
              <span className="icon">
                <img src={config.imagepath + "caleder.png"} alt="" />
              </span>
              <span className="d-lg-none ps-3">{t('Calendar')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={config.basePath + "/sales"} data-bs-toggle="tooltip" data-bs-placement="right" title={t('Sales')}>
              <span className="icon">
                <img src={config.imagepath + "sales.png"} alt="" />
              </span>
              <span className="d-lg-none ps-3">{t('Sales')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={config.basePath + "/vouchers"} data-bs-toggle="tooltip" data-bs-placement="right" title={t('Vouchers')}>
              <span className="icon">
                <img src={config.imagepath + "Vouchers.png"} alt="" />
              </span>
              <span className="d-lg-none ps-3">{t('Vouchers')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={config.basePath + "/subscriptions"} data-bs-toggle="tooltip" data-bs-placement="right" title={t('Subscriptions')}>
              <span className="icon">
                <img src={config.imagepath + "refresh.png"} alt="" />
              </span>
              <span className="d-lg-none ps-3">{t('Subscriptions')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={config.basePath + "/clients"} data-bs-toggle="tooltip" data-bs-placement="right" title={t('Clients')}>
              <span className="icon">
                <img src={config.imagepath + "user.png"} alt="" />
              </span>
              <span className="d-lg-none ps-3">{t('Clients')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={config.basePath + "/staff"} data-bs-toggle="tooltip" data-bs-placement="right" title={t('Staff')}>
              <span className="icon">
                <img src={config.imagepath + "staff.png"} alt="" />
              </span>
              <span className="d-lg-none ps-3">{t('Staff')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={config.basePath + "/services"} data-bs-toggle="tooltip" data-bs-placement="right" title={t('Services')}>
              <span className="icon">
                <img src={config.imagepath + "Services.png"} alt="" />
              </span>
              <span className="d-lg-none ps-3">{t('Services')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={config.basePath + "/products"} data-bs-toggle="tooltip" data-bs-placement="right" title={t('Products')}>
              <span className="icon">
                <img src={config.imagepath + "product.png"} alt="" />
              </span>
              <span className="d-lg-none ps-3">{t('Products')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={config.basePath + "/reports"} data-bs-toggle="tooltip" data-bs-placement="right" title={t('Reports')}>
              <span className="icon">
                <img src={config.imagepath + "Reports.png"} alt="" />
              </span>
              <span className="d-lg-none ps-3">{t('Reports')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={config.basePath + "/marketing"} data-bs-toggle="tooltip" data-bs-placement="right" title={t('Marketing')}>
              <span className="icon">
                <img src={config.imagepath + "Marketing.png"} alt="" />
              </span>
              <span className="d-lg-none ps-3">{t('Marketing')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={config.basePath + "/account"} data-bs-toggle="tooltip" data-bs-placement="right" title={t('Account_Setup')}>
              <span className="icon">
                {" "}
                <img src={config.imagepath + "setting.png"} alt="" />
              </span>
              <span className="d-lg-none ps-3">{t('Account_Setup')}</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
