import React from "react";
import "./Footer.css";
import "./Layout.css";

function Footer() {
  const handleBackToTop = (_e) => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <div className="footer">
      <div className="footer__backtop" onClick={handleBackToTop}>
        Back to top
      </div>

      <div className="footer__main">
        <div className="__row">
          <div className="__col4">
            <h4>Get to Know Us</h4>
            <ul>
              <li className="nav_first">
                <a href="https://www.amazon.jobs" className="footer__nav_a">
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="https://blog.aboutamazon.com/?utm_source=gateway&amp;utm_medium=footer"
                  className="footer__nav_a"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="https://www.aboutamazon.com/?utm_source=gateway&amp;utm_medium=footer"
                  className="footer__nav_a"
                >
                  About Amazon
                </a>
              </li>
              <li>
                <a href="https://www.amazon.com/ir" className="footer__nav_a">
                  Investor Relations
                </a>
              </li>
              <li>
                <a
                  href="/gp/browse.html?node=2102313011&amp;ref_=footer_devices"
                  className="footer__nav_a"
                >
                  Amazon Devices
                </a>
              </li>
              <li className="nav_last ">
                <a
                  href="https://www.aboutamazon.com/amazon-fulfillment-center-tours?utm_source=gateway&amp;utm_medium=footer&amp;utm_campaign=fctours"
                  className="footer__nav_a"
                >
                  Amazon Tours
                </a>
              </li>
            </ul>
          </div>

          <div className="__col4">
            <h4>Make Money with Us</h4>
            <ul>
              <li class="nav_first">
                <a
                  href="https://services.amazon.com/sell.html?ld=AZFSSOA&amp;ref_=footer_soa"
                  class="nav_a"
                >
                  Sell products on Amazon
                </a>
              </li>
              <li>
                <a
                  href="https://services.amazon.com/amazon-business.html?ld=usb2bunifooter&amp;ref_=footer_b2b"
                  class="nav_a"
                >
                  Sell on Amazon Business
                </a>
              </li>
              <li>
                <a href="https://developer.amazon.com" class="nav_a">
                  Sell apps on Amazon
                </a>
              </li>
              <li>
                <a href="https://affiliate-program.amazon.com/" class="nav_a">
                  Become an Affiliate
                </a>
              </li>
              <li>
                <a
                  href="https://advertising.amazon.com/?ref=ext_amzn_ftr"
                  class="nav_a"
                >
                  Advertise Your Products
                </a>
              </li>
              <li>
                <a
                  href="/gp/seller-account/mm-summary-page.html?ld=AZFooterSelfPublish&amp;topic=200260520&amp;ref_=footer_publishing"
                  class="nav_a"
                >
                  Self-Publish with Us
                </a>
              </li>
              <li>
                <a
                  href="http://go.thehub-amazon.com/amazon-hub-locker"
                  class="nav_a"
                >
                  Host an Amazon Hub
                </a>
              </li>
              <li class="nav_last nav_a_carat">
                <span class="nav_a_carat">›</span>
                <a
                  href="/b/?node=18190131011&amp;ld=AZUSSOA-seemore&amp;ref_=footer_seemore"
                  class="nav_a"
                >
                  See More Make Money with Us
                </a>
              </li>
            </ul>
          </div>

          <div className="__col4">
            <h4>Amazon Payment Products</h4>
            <ul>
              <li class="nav_first">
                <a
                  href="/dp/B07984JN3L?plattr=ACOMFO&amp;ie=UTF-8"
                  class="nav_a"
                >
                  Amazon Business Card
                </a>
              </li>
              <li>
                <a
                  href="/gp/browse.html?node=16218619011&amp;ref_=footer_swp"
                  class="nav_a"
                >
                  Shop with Points
                </a>
              </li>
              <li>
                <a
                  href="/gp/browse.html?node=10232440011&amp;ref_=footer_reload_us"
                  class="nav_a"
                >
                  Reload Your Balance
                </a>
              </li>
              <li class="nav_last ">
                <a
                  href="/gp/browse.html?node=388305011&amp;ref_=footer_tfx"
                  class="nav_a"
                >
                  Amazon Currency Converter
                </a>
              </li>
            </ul>
          </div>

          <div className="__col4">
            <h4>Let Us Help You</h4>
            <ul>
              <li class="nav_first">
                <a
                  href="/gp/help/customer/display.html?nodeId=GDFU3JS5AL6SYHRD&amp;ref_=footer_covid"
                  class="nav_a"
                >
                  Amazon and COVID-19
                </a>
              </li>
              <li>
                <a
                  href="https://www.amazon.com/gp/css/homepage.html?ref_=footer_ya"
                  class="nav_a"
                >
                  Your Account
                </a>
              </li>
              <li>
                <a
                  href="https://www.amazon.com/gp/css/order-history?ref_=footer_yo"
                  class="nav_a"
                >
                  Your Orders
                </a>
              </li>
              <li>
                <a
                  href="/gp/help/customer/display.html?nodeId=468520&amp;ref_=footer_shiprates"
                  class="nav_a"
                >
                  Shipping Rates &amp; Policies
                </a>
              </li>
              <li>
                <a
                  href="/gp/css/returns/homepage.html?ref_=footer_hy_f_4"
                  class="nav_a"
                >
                  Returns &amp; Replacements
                </a>
              </li>
              <li>
                <a
                  href="/gp/digital/fiona/manage?ref_=footer_myk"
                  class="nav_a"
                >
                  Manage Your Content and Devices
                </a>
              </li>
              <li>
                <a
                  href="/gp/BIT/ref=footer_bit_v2_us_A0029?bitCampaignCode=A0029"
                  class="nav_a"
                >
                  Amazon Assistant
                </a>
              </li>
              <li class="nav_last ">
                <a
                  href="/gp/help/customer/display.html?nodeId=508510&amp;ref_=footer_gw_m_b_he"
                  class="nav_a"
                >
                  Help
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom"></div>
    </div>
  );
}

export default Footer;
