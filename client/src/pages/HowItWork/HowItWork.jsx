import React,{useEffect} from 'react';
import accordion from './Accordion';
const dataText=[
  'Name For Sale',
  'Naming Contests ',
   'Other Services',
   'Agency Experience',
   'Resources',
];




const HowItWork = () => {

  const pageBody=()=>{
    return(
      <>
      <header className="headerLayout">
        <div>
          <a href="/">
            <img src="./images/logo_white.svg" alt="" />
          </a>
        </div>
        <div className="headerInputWrapper">
          <input type="text" placeholder="Search over 100,000 names" />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="gray"
              width="20px"
              heigth="20px"
              viewBox="0 0 512 512"
            >
              {/* <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </button>
        </div>
        <div className="icons">
          <div>
            <a href="/">
              <img src="./images/icons/account.svg" alt="" />
              <div className="header-icon-name">Account</div>
            </a>
          </div>
          <div>
            <a href="/">
              <img src="./images/icons/phone.svg" alt="" />
              <div className="header-icon-name">Contact</div>
            </a>
          </div>
          <div>
            <a href="/">
              <img src="./images/icons/heart.svg" alt="" />
              <div className="header-icon-name">Favorites</div>
            </a>
          </div>
          <div>
            <a href="/" className="header-icon-name header-icon-name__border ">
              Start Contest
            </a>
          </div>
          <div id="menu" onClick={openMenu}>
            <img src="./images/icons/menu.svg" alt="" />
          </div>
        </div>
      </header>

      <nav className="mobileMenu">
        <ul id="navUl"></ul>
        <div id="regBtnNav">
          <div className="linkWrapper">
            <a href="/">Login</a>
            <a href="/">Sign In</a>
          </div>
        </div>
      </nav>

      <nav className="main-header__nav">
        <ul className="main-header__list">
          <li className="main-header__item">
            <a href="/" className="main-header__link">
              Names For Sale
            </a>
            <span className="main-header__link_chevronUp">
              <i className="fa-solid fa-chevron-up"></i>
            </span>
            <span className="main-header__link_chevronDown">
              <i className="fa-solid fa-chevron-down"></i>
            </span>
            <ul className="main-header__list__sublist">
              <li>
                <a href="" className="main-header__list__sublist_list">
                  Popular brandable Names
                </a>
              </li>
              <li>
                <a href="" className="main-header__list__sublist_list">
                  Premium Domains For Sale
                </a>
              </li>
              <li>
                <a href="" className="main-header__list__sublist_list">
                  Sort Domains
                </a>
              </li>
              <ul>
                <li>
                  <a href="" className="main-header__list__sublist_list">
                    3 Letter Domains
                  </a>
                </li>
                <li>
                  <a href="" className="main-header__list__sublist_list">
                    4 Letter Domains
                  </a>
                </li>
                <li>
                  <a href="" className="main-header__list__sublist_list">
                    5 Letter Domains
                  </a>
                </li>
              </ul>
              <li>
                <a href="" className="main-header__list__sublist_list">
                  One Word Names
                </a>
              </li>
              <li>
                <a href="" className="main-header__list__sublist_list">
                  Industry Names
                </a>
              </li>
              <li>
                <a href="" className="main-header__list__sublist_list">
                  Location Based Names
                </a>
              </li>
              <li>
                <a href="" className="main-header__list__sublist_list">
                  Recommended For You
                </a>
              </li>
              <li>
                <a href="" className="main-header__list__sublist_list">
                  Become A Seller
                </a>
              </li>
            </ul>
          </li>
          <li className="main-header__item">
            <a href="/" className="main-header__link">
              Naming Contest
            </a>
            <span className="main-header__link_chevronUp">
              <i className="fa-solid fa-chevron-up"></i>
            </span>
            <span className="main-header__link_chevronDown">
              <i className="fa-solid fa-chevron-down"></i>
            </span>
            <ul className="main-header__list__sublist">
              <li>
                <a href="" className="main-header__list__sublist_list">
                  Start A Contest
                </a>
              </li>
              <li>
                <a href="" className="main-header__list__sublist_list">
                  Hot It Works
                </a>
              </li>
              <li>
                <a href="" className="main-header__list__sublist_list">
                  Contest Pricing
                </a>
              </li>
              <li>
                <a href="" className="main-header__list__sublist_list">
                  Agency Cervices
                </a>
              </li>
              <li>
                <a href="" className="main-header__list__sublist_list">
                  Our Work
                </a>
              </li>
              <li>
                <a href="" className="main-header__list__sublist_list">
                  Recent Winners
                </a>
              </li>
              <li>
                <a href="" className="main-header__list__sublist_list">
                  Active Contests
                </a>
              </li>
              <li>
                <a href="" className="main-header__list__sublist_list">
                  Become A Creative
                </a>
              </li>
            </ul>
          </li>
          <li className="main-header__item">
            <a href="/" className="main-header__link">
              Other Services
            </a>
            <span className="main-header__link_chevronUp">
              <i className="fa-solid fa-chevron-up"></i>
            </span>
            <span className="main-header__link_chevronDown">
              <i className="fa-solid fa-chevron-down"></i>
            </span>
            <ul className="main-header__list__sublist">
              <li>
                <a href="" className="main-header__list__sublist_list">
                  Logos
                </a>
              </li>
              <li>
                <a href="" className="main-header__list__sublist_list">
                  Taglines
                </a>
              </li>
              <li>
                <a href="" className="main-header__list__sublist_list">
                  Audience Testing
                </a>
              </li>
              <li>
                <a href="" className="main-header__list__sublist_list">
                  Trademark Research
                </a>
              </li>
              <li>
                <a href="" className="main-header__list__sublist_list">
                  Trademark Filing
                </a>
              </li>
              <li>
                <a href="" className="main-header__list__sublist_list">
                  Video Creation
                </a>
              </li>
            </ul>
          </li>
          <li className="main-header__item">
            <a href="/" className="main-header__link">
              Agency Experience
            </a>
          </li>
          <li className="main-header__item">
            <a href="/" className="main-header__link">
              Resources
            </a>
            <span className="main-header__link_chevronUp">
              <i className="fa-solid fa-chevron-up"></i>
            </span>
            <span className="main-header__link_chevronDown">
              <i className="fa-solid fa-chevron-down"></i>
            </span>
            <ul className="main-header__list__sublist">
              <li>
                <a href="" className="main-header__list__sublist_list">
                  Business Name Generator
                </a>
              </li>
              <li>
                <a href="" className="main-header__list__sublist_list">
                  How to Naming Your Business
                </a>
              </li>
              <li>
                <a href="" className="main-header__list__sublist_list">
                  FreeTrademarkChecker
                </a>
              </li>
              <li className="main-header__item__second-level">
                <a href="" className="main-header__list__sublist_list">
                  <span className="main-header__link">Industry Name Ideas</span>
                  <span className="main-header__link_chevronRight__second-level">
                    <i className="fa-solid fa-chevron-right"></i>
                  </span>
                  <span className="main-header__link_chevronDown__second-level">
                    <i className="fa-solid fa-chevron-down"></i>
                  </span>
                </a>

                <ul className="main-header__list__sublist__second-level">
                  <li className="second-level">
                    <a href="" className="main-header__list__sublist_list">
                      Clothing Brand Name Ideas
                    </a>
                  </li>
                  <a href="">
                    <li className="second-level">
                      <a href="" className="main-header__list__sublist_list">
                        Consulting Business Name Ideas
                      </a>
                    </li>
                  </a>
                  <li className="second-level">
                    <a href="" className="main-header__list__sublist_list">
                      Health & Wellness Business Name Ideas
                    </a>
                  </li>
                  <li className="second-level">
                    <a href="" className="main-header__list__sublist_list">
                      Food Brand Name Ideas
                    </a>
                  </li>
                  <li className="second-level">
                    <a href="" className="main-header__list__sublist_list">
                      Beauty Business Name
                    </a>
                  </li>
                  <li className="second-level">
                    <a href="" className="main-header__list__sublist_list">
                      Tech Startup Name Ideas
                    </a>
                  </li>
                  <li className="second-level">
                    <a href="" className="main-header__list__sublist_list">
                      Shoping Website Name Ideas
                    </a>
                  </li>
                  <li className="second-level">
                    <a href="" className="main-header__list__sublist_list">
                      Real Estate Business Name Ideas
                    </a>
                  </li>
                  <li className="second-level">
                    <a href="" className="main-header__list__sublist_list">
                      Insurance Business Name Ideas
                    </a>
                  </li>
                  <li className="second-level">
                    <a href="" className="main-header__list__sublist_list">
                      Finance Business Name Ideas
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <main className="main">
        <button onClick={topFunction} id="myBtn" title="Go to top"></button>
        <div id="microMan">
          <img src="./images/icons/microMan.svg" alt="oops!" />
        </div>
        <section id="intro" className="container-space">
          <div>
            <span className="spanBeforetitle">World's #1 Naming Platform</span>
            <h1 className="title">How Does Squadhelp Work?</h1>
            <p className="paragraphAftertitle">
              Squadhelp helps you come up with a great name for your business by
              combining the power of crowdsourcing with sophisticated technology
              and Agency-level validation services.
            </p>
            <a
              className="videoBtn"
              data-fancybox
              href="https://vimeo.com/368584367"
            >
              <div id="playBtn">
                <img src="./images/icons/play.svg" alt="" />
              </div>
              <div>Play Video</div>
            </a>
          </div>
          <div className="bannerIntroSection">
            <img src="./images/bannerIntroSection.svg" alt="" />
          </div>
        </section>

        <section id="servicesSection" className="container-space">
          <span className="ourService">Our Services</span>
          <h2 className="title">3 Ways To Use Squadhelp</h2>
          <p className="paragraphAftertitle">
            Squadhelp offers 3 ways to get you a perfect name for your business.
          </p>
          <article className="articleServicesSection">
            <div className="cardBody">
              <img src="./images/people.svg" alt="oops!" />
              <h3 className="title">Launch a Contest</h3>
              <p className="paragraphAftertitle">
                Work with hundreds of creative experts to get custom name
                suggestions for your business or brand. All names are
                auto-checked for URL availability.
              </p>
              <a href="/" className="cardBodyBtnLink">
                Launch a Contest
              </a>
            </div>
            <div className="cardBody">
              <img src="./images/monitor.svg" alt="oops!" />
              <h3 className="title">Explore Names For Sale</h3>
              <p className="paragraphAftertitle">
                Our branding team has curated thousands of pre-made names that
                you can purchase instantly. All names include a matching URL and
                a complimentary Logo Design
              </p>
              <a href="/" className="cardBodyBtnLink">
                Explore Names For Sale
              </a>
            </div>
            <div className="cardBody">
              <img src="./images/lamp.svg" alt="oops!" />
              <h3 className="title">Agency-level Managed Contests</h3>
              <p className="paragraphAftertitle">
                Our Managed contests combine the power of crowdsourcing with the
                rich experience of our branding consultants. Get a complete
                agency-level experience at a fraction of Agency costs
              </p>
              <a href="/" className="cardBodyBtnLink">
                Learn More
              </a>
            </div>
          </article>
        </section>

        <hr />
        <section id="featuresSection" className="container-space">
          <div className="featuresSectionTitle">
            <div>
              <img src="./images/cup.svg" alt="oops!" />
            </div>
            <h2 className="title">How Do Naming Contests Work?</h2>
          </div>

          <div className="featuresSectionBody">
            <div className="featuresSectionlContainer">
              <ul>
                <li className="featuresSection__li firstLi">
                  <div className="featuresSection__li__div">
                    <div className="featuresSection__li__number">1.</div>
                    <div className="featuresSection__li__text">
                      Fill out your Naming Brief and begin receiving name ideas
                      in minutes
                    </div>
                  </div>
                </li>
                <li className="featuresSection__li">
                  <div className="featuresSection__li__div">
                    <div className="featuresSection__li__number">2.</div>
                    <div className="featuresSection__li__text">
                      Fill out your Naming Brief and begin receiving name ideas
                      in minutes
                    </div>
                  </div>
                </li>
                <li className="featuresSection__li">
                  <div className="featuresSection__li__div">
                    <div className="featuresSection__li__number">3.</div>
                    <div className="featuresSection__li__text">
                      Fill out your Naming Brief and begin receiving name ideas
                      in minutes
                    </div>
                  </div>
                </li>
                <li className="featuresSection__li lastLi">
                  <div className="featuresSection__li__div">
                    <div className="featuresSection__li__number">4.</div>
                    <div className="featuresSection__li__text">
                      Fill out your Naming Brief and begin receiving name ideas
                      in minutes
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="imageContainer">
              <img
                className="imageContainer"
                src="./images/feauterSection.svg"
                alt=""
              />
            </div>
          </div>
        </section>

        <hr />
        <section id="faqSection" className="container-space">
          <div className="flexContainer__faqSection">
            <div id="blockStartPoint">
              <nav>
                <ul>
                  <li>
                    <a href="#contest">Launching A Contest</a>
                  </li>
                  <li>
                    <a href="#marketplace">Buying From Marketplace</a>
                  </li>
                  <li>
                    <a href="#managed">Managed Contests</a>
                  </li>
                  <li>
                    <a href="#creatives">For Creatives</a>
                  </li>
                </ul>
              </nav>
            </div>

            <div id="blockFaqAccordion">
              <div id="contest">
                <div className="titleInContest">
                  <h3>Launching A Contest</h3>
                </div>
                <div id="basicsAccordion">
                  <div className="card">
                    <button className="course-accordion">
                      How long does it take to start receiving submissions?
                    </button>

                    <div className="course-panel">
                      <p>
                        For Naming contests, you will start receiving your
                        submissions within few minutes of launching your
                        contest. Since our creatives are located across the
                        globe, you can expect to receive submissions 24 X 7
                        throughout the duration of the brainstorming phase .
                      </p>
                    </div>
                  </div>

                  <div className="card">
                    <button className="course-accordion">
                      How long do Naming Contests last?
                    </button>

                    <div className="course-panel">
                      <p>
                        You can choose a duration from 1 day to 7 days. We
                        recommend a duration of 3 Days or 5 Days. This allows
                        for sufficient time for entry submission as well as
                        brainstorming with creatives. If you take advantage of
                        our validation services such as Audience Testing and
                        Trademark Research, both will be an additional 4-7 days
                        (3-5 business days for Audience Testing and 1-2 business
                        days for Trademark Research).
                      </p>
                    </div>
                  </div>

                  <div className="card">
                    <button className="course-accordion">
                      Where are the creatives located?
                    </button>

                    <div className="course-panel">
                      <p>
                        About 70% of our Creatives are located in the United
                        States and other English speaking countries (i.e. United
                        Kingdom, Canada, and Australia.). We utilize an advanced
                        rating score algorithm to ensure that high quality
                        creatives receive more opportunities to participate in
                        our contests.
                      </p>
                    </div>
                  </div>

                  <div className="card">
                    <button className="course-accordion">
                      What if I do not like any submissions?
                    </button>

                    <div className="course-panel">
                      <p>
                        While it is unusually rare that you will not like any
                        names provided, we have a few options in case this
                        problem occurs:
                        <ul>
                          <li>
                            If the contest ends and you have not yet found a
                            name that you’d like to move forward with, we can
                            provide complimentary extension of your contest as
                            well as a complimentary consultation with one of our
                            branding consultants (a $99 value).
                          </li>
                          <li>
                            By exploring our premium domain marketplace you can
                            apply the contest award towards the purchase of any
                            name listed for sale.
                          </li>
                          <li>
                            If you choose the Gold package or Platinum package
                            and keep the contest as "Not Guaranteed", you can
                            request a partial refund if you choose not to move
                            forward with any name from you project. (Please note
                            that the refund is for the contest award). Here is a
                            link to our <a href="/">Refund</a> Policy
                          </li>
                        </ul>
                      </p>
                    </div>
                  </div>

                  <div className="card">
                    <button className="course-accordion">
                      How much does it cost?
                    </button>

                    <div className="course-panel">
                      <p>
                        Our naming competitions start at $299, and our logo
                        design competitions start at $299. Also, there are three
                        additional contest level that each offer more features
                        and benefits. See our <a href="/">Pricing Page</a> for
                        details
                      </p>
                    </div>
                  </div>

                  <div className="card">
                    <button className="course-accordion">
                      I need both a Name and a Logo. Do you offer any discount
                      for multiple contests?
                    </button>

                    <div className="course-panel">
                      <p>
                        Yes! We have many contest bundles - our most popular
                        being our Name, Tagline, and Logo bundle. Bundles allow
                        you to purchase multiple contests at one time and save
                        as much as from $75 - $400. You can learn more about our
                        bundle options on our <a href="/">Pricing Page</a>.
                      </p>
                    </div>
                  </div>

                  <div className="card">
                    <button className="course-accordion">
                      What if I want to keep my business idea private?
                    </button>

                    <div className="course-panel">
                      <p>
                        You can select a Non Disclosure Agreement (NDA) option
                        at the time of launching your competition. This will
                        ensure that only those contestants who agree to the NDA
                        will be able to read your project brief and participate
                        in the contest. The contest details will be kept private
                        from other users, as well as search engines.
                      </p>
                    </div>
                  </div>

                  <div className="card">
                    <button className="course-accordion">
                      Can you serve customers outside the US?
                    </button>

                    <div className="course-panel">
                      <p>
                        Absolutely. Squadhelp services organizations across the
                        globe. Our customer come from many countries, such as
                        the United States, Australia, Canada, Europe, India, and
                        MENA. We’ve helped more than 25,000 customer around the
                        world.
                      </p>
                    </div>
                  </div>

                  <div className="card">
                    <button className="course-accordion">
                      Can I see any examples?
                    </button>

                    <div className="course-panel">
                      <p>
                        Our creatives have submitted more than 6 Million names
                        and thousands of logos on our platform. Here are some
                        examples of Names, Taglines, and Logos that were
                        submitted in recent contests.
                        <ul>
                          <li>
                            <a href="/">Name Examples</a>
                          </li>
                          <li>
                            <a href="/">Tagline Examples</a>T
                          </li>
                          <li>
                            <a href="/">Logo Examples</a>
                          </li>
                        </ul>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div id="marketplace">
                <div className="titleInContest">
                  <h3>Buying From Marketplacet</h3>
                </div>
                <div id="syncingAccordion">
                  <div className="card">
                    <button className="course-accordion2">
                      What's included with a Domain Purchase?
                    </button>

                    <div className="course-panel2">
                      <p>
                        When you purchase a domain from our premium domain
                        marketplace, you will receive the exact match .com URL,
                        a complimentary logo design (along with all source
                        files), as well as a complimentary Trademark report and
                        Audience Testing if you’re interested in validating your
                        name.
                      </p>
                    </div>
                  </div>

                  <div className="card">
                    <button className="course-accordion2">
                      How does the Domain transfer process work?
                    </button>

                    <div className="course-panel2">
                      <p>
                        Once you purchase a Domain, our transfer specialists
                        will reach out to you (typically on the same business
                        day). In most cases we can transfer the domain to your
                        preferred registrar (such as GoDaddy). Once we confirm
                        the transfer details with you, the transfers are
                        typically initiated to your account within 1 business
                        day.
                      </p>
                    </div>
                  </div>

                  <div className="card">
                    <button className="course-accordion2">
                      If I purchase a Domain on installments, can I start using
                      it to setup my website?
                    </button>

                    <div className="course-panel2">
                      <p>
                        We offer payment plans for many domains in our
                        Marketplace. If you purchase a domain on a payment plan,
                        we hold the domain in an Escrow account until it is
                        fully paid off. However our team can assist you with
                        making any changes to the domains (such as Nameserver
                        changes), so that you can start using the domain right
                        away after making your first installment payment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div id="managed">
                <div className="titleInContest">
                  <h3>Managed Contest</h3>
                </div>
                <div id="accoutnAccordion">
                  <div className="card">
                    <button className="course-accordion3">
                      What are Managed Contests?
                    </button>

                    <div className="course-panel3">
                      <p>
                        The 'Managed' option is a fully managed service by
                        Squadhelp Branding experts. It includes a formal brief
                        preparation by Squadhelp team and management of your
                        contest. Managed Contests are a great fit for companies
                        that are looking for an "Agency" like experience and
                        they do not want to manage the contest directly. Our
                        branding team has directly managed hundreds of branding
                        projects and has learned several best practices that
                        lead to successful project outcomes. Our team will apply
                        all best practices towards the management of your
                        branding project. Learn more about our{' '}
                        <a href="/">Managed Contest Service</a>
                      </p>
                    </div>
                  </div>

                  <div className="card">
                    <button className="course-accordion3">
                      What's a typical timeline for a Managed Contest?
                    </button>

                    <div className="course-panel3">
                      <p>
                        The overall process takes 12-13 days.
                        <ul>
                          <li>
                            The Managed projects start with a project kick-off
                            call with your Branding Consultant. You can schedule
                            this call online immediately after making your
                            payment.
                          </li>
                          <li>
                            After your kick-off call, the Branding consultant
                            will write your project brief and send for your
                            approval within 1 business day.
                          </li>
                          <li>
                            Upon your approval, the contest will go live. The
                            branding consultant will help manage your project
                            throughout the brainstorming phase (typically 5
                            days)
                          </li>
                          <li>
                            Upon the completion of brainstorming phase, the
                            branding consultant will work with you to test the
                            top 6 names from your Shortlist (3-5 Days). In
                            addition, the branding consultant will coordinate
                            the detailed Trademark screening (1-3 days)
                          </li>
                        </ul>
                      </p>
                    </div>
                  </div>

                  <div className="card">
                    <button className="course-accordion3">
                      How much do Managed Contest cost?
                    </button>

                    <div className="course-panel3">
                      <p>
                        We offer two levels of Managed Contests. Standard
                        ($1499) and Enterprise ($2999). The Enterprise managed
                        contest includes:
                        <ul>
                          <li>
                            (1) a $500 award amount (instead of $300), which
                            will attract our top Creatives and provide more
                            options to choose from;
                          </li>
                          <li>
                            (2) we will ensure a senior member of our branding
                            team is assigned to your project and the branding
                            team will invest about 3X more time in the
                            day-to-day management of your project;
                          </li>
                          <li>
                            (3) you will receive more high-end trademark report
                            and 5X more responses for your audience test.
                          </li>
                          <li>
                            Here is a link to our <a href="/">Pricing page</a>{' '}
                            with a detailed comparison of the two packages.
                          </li>
                        </ul>
                      </p>
                    </div>
                  </div>

                  <div className="card">
                    <button className="course-accordion3">
                      Where are the Branding Consultant located?
                    </button>

                    <div className="course-panel3">
                      <p>
                        All our branding consultants are based in in our
                        Headquarters (Hoffman Estates, IL). Our branding
                        consultants have many years of experience in managing
                        hundreds of branding projects for companies ranging from
                        early stage startups to Fortune 500 corporations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div id="creatives">
                <div className="titleInContest">
                  <h3>For Creatives</h3>
                </div>
                <div id="privacyAccordion">
                  <div className="card">
                    <button className="course-accordion4">
                      Can anyone join your platform?
                    </button>

                    <div className="course-panel4">
                      <p>
                        We are open to anyone to signup. However, we have an
                        extensive "Quality Scoring" process which ensures that
                        high quality creatives have the ability to continue to
                        participate in the platform. On the other hand, we limit
                        the participation from those creatives who do not
                        consistently receive high ratings.
                      </p>
                    </div>
                  </div>

                  <div className="card">
                    <button className="course-accordion4">
                      Can I start participanting immediately upon signing up?
                    </button>

                    <div className="course-panel4">
                      <p>
                        When you initially signup, you are assigned few contests
                        to assess your overall quality of submissions. Based
                        upon the quality of your submissions, you will continue
                        to be assigned additional contests. Once you have
                        received enough high ratings on your submissions, your
                        account will be upgraded to "Full Access", so that you
                        can begin participating in all open contests.
                      </p>
                    </div>
                  </div>

                  <div className="card">
                    <button className="course-accordion4">
                      How Do I Get Paid?
                    </button>

                    <div className="course-panel4">
                      <p>
                        We handle creative payouts via Paypal or Payoneer.
                        Depending upon your country of residence, we may require
                        additional documentation to verify your identity as well
                        as your Tax status.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="ctaSection">
          <div>
            <h3>Ready to get started?</h3>
            <p>
              Fill out your contest brief and begin receiving custom name
              suggestions within minutes.
            </p>
            <a href="/" id="ctaSectionLink">
              Start a Contest
            </a>
          </div>
          <div>
            <img src="./images/ctaSection1.svg" alt="opps!" />
          </div>
          <div>
            <img src="./images/ctaSection2.svg" alt="opps!" />
          </div>
        </section>

        <section id="statsSection" className="container-space">
          <div>
            <div className="statsSectionImgWrap">
              <img src="./images/stars.svg" alt="" />
            </div>
            <p>
              <span>4.9 out of 5 stars</span> from 25,000+ customers.
            </p>
          </div>
          <div>
            <div className="statsSectionImgWrap">
              <img src="./images/people.webp" alt="" />
            </div>
            <p>
              Our branding community stands <span>200,000+ </span>strong.
            </p>
          </div>
          <div>
            <div className="statsSectionImgWrap">
              <img src="./images/sharing-files.svg" alt="" />
            </div>
            <p>
              <span>140+ Industries</span> supported across more than{' '}
              <span>85 countries</span>– and counting.
            </p>
          </div>
        </section>

        <section id="pricingSection" className="container-space">
          <div className="flexContainer__faqSection">
            <div id="divPadd">
              <ul>
                <li className="liWrapper">
                  <div className="blueCircle"></div>
                  <div>
                    <h4>Pay a Fraction of cost vs hiring an agency</h4>
                    <p>
                      For as low as $199, our naming contests and marketplace
                      allow you to get an amazing brand quickly and affordably.
                    </p>
                  </div>
                </li>
                <li className="border-top"></li>
                <li className="liWrapper">
                  <div className="blueCircle"></div>
                  <div>
                    <h4>Satisfaction Guarantee</h4>
                    <p>
                      Of course! We have policies in place to ensure that you
                      are satisfied with your experience.{' '}
                      <a href="/">Learn more</a>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div id="questions">
              <h4>Questions?</h4>
              <p>
                Speak with a Squadhelp platform expert to learn more and get
                your questions answered.
              </p>
              <button>Scheldule Consultation</button>
              <div>
                <span></span>
                <a href="tel:(877) 355-3585">(877) 355-3585</a>
              </div>
              <p>Call us for assistance</p>
            </div>
          </div>
        </section>

        <section id="clientSection" className="container-space">
          <div className="container">
            <div>
              <h6>Featured In</h6>
            </div>

            <div id="brands">
              <hr />
              <div className="brandsImg">
                <a href="">
                  <img src="./images/clients/forbes.svg" alt="" />
                </a>
              </div>
              <div className="brandsImg">
                <img src="./images/clients/TNW.svg" alt="" />
              </div>
              <div className="brandsImg">
                <img src="./images/clients/chicago.svg" alt="" />
              </div>
              <div className="brandsImg">
                <img src="./images/clients/Mashable.svg" alt="" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-wrapper">
          <div className="footer-container">
            <div>
              <h2>Services</h2>
              <ul>
                <li className="list">
                  <a href="">Premium Domains For Sale</a>
                </li>
                <li className="list">
                  <a href="">Crowdsource Naming</a>
                </li>
                <li className="list">
                  <a href="">Naming Agency</a>
                </li>
                <li className="list">
                  <a href="">Brandable Domains</a>
                </li>
                <li className="list">
                  <a href="">Sort Domains</a>
                </li>
                <ul>
                  <li className="subList">
                    <a href="">3 Letter Domains</a>
                  </li>
                  <li className="subList">
                    <a href="">4 Letter Domains</a>
                  </li>
                  <li className="subList">
                    <a href="">5 Letter Domains</a>
                  </li>
                </ul>
                <li className="list">
                  <a href="">One Word Domains</a>
                </li>
                <li className="list">
                  <a href="">Industry Domains</a>
                </li>
                <li className="list">
                  <a href="">Agency Services</a>
                </li>
                <li className="list">
                  <a href="">Logo Contests</a>
                </li>
                <li className="list">
                  <a href="">Tagline Contests</a>
                </li>
                <li className="list">
                  <a href="">Trademark Filing Service</a>
                </li>
                <li className="list">
                  <a href="">Audience Test</a>
                </li>
              </ul>
            </div>
            <div>
              <h2>Tools</h2>
              <ul>
                <li className="list">
                  <a href="">Business Name Generator</a>
                </li>
                <li className="list">
                  <a href="">How to Name Your Business</a>
                </li>
                <li className="list">
                  <a href="">Free Trademark Checker</a>
                </li>
                <li className="list">
                  <a href="">Branding Blog</a>
                </li>
                <li className="list">
                  <a href="">Business Naming eBook</a>
                </li>
                <li className="list">
                  <a href="">Startup Toolkit</a>
                </li>
              </ul>
            </div>
            <div>
              <h2>SquadHelp</h2>
              <ul>
                <li className="list">
                  <a href="">About</a>
                </li>
                <li className="list">
                  <a href="">Contact</a>
                </li>
                <li className="list">
                  <a href="">How It Works</a>
                </li>
                <li className="list">
                  <a href="">Testimonials</a>
                </li>
                <li className="list">
                  <a href="">Our Work</a>
                </li>
                <li className="list">
                  <a href="">Help & FAQs</a>
                </li>
              </ul>
            </div>
            <div>
              <div>
                <h2>Creatives</h2>
                <ul>
                  <li className="list">
                    <a href="">Get Started</a>
                  </li>
                  <li className="list">
                    <a href="">Help & FAQs</a>
                  </li>
                  <li className="list">
                    <a href="">Domin Selling Info</a>
                  </li>
                  <li className="list">
                    <a href="">Discussion Forum</a>
                  </li>
                </ul>
              </div>
              <div>
                <h2>Legal</h2>
                <ul>
                  <li className="list">
                    <a href="">Terms of Service</a>
                  </li>
                  <li className="list">
                    <a href="">Privacy Policy</a>
                  </li>
                  <li className="list">
                    <a href="">Cookie Policy</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <h2 className="footer-container__title">Trending Searches</h2>
          <div className="footer-trending">
            <div>
              <div>
                <p>
                  Explore our unique, hand-picked brand & business names for
                  sale along with a matching, premium domain name. Buy instantly
                  for a fixed low price.
                </p>
                <form method="get">
                  <input type="text" placeholder="Search over 75.000 Names" />
                  <button>
                    <img
                      src="./images/icons/magnifying-glass-solid.svg"
                      alt="oops"
                    />
                  </button>
                </form>
              </div>
              <div></div>
            </div>
            <div className="flashLinkFooter">
              <div className="footer-search-terms">
                <div className="footer-term-box">
                  <a href="">
                    <span className="footer-term-box_span">Short Names</span>
                  </a>
                </div>
              </div>
              <div className="footer-search-terms">
                <div className="footer-term-box">
                  <a href="">
                    <span className="footer-term-box_span">One Word</span>
                  </a>
                </div>
              </div>
              <div className="footer-search-terms">
                <div className="footer-term-box">
                  <a href="">
                    <span className="footer-term-box_span">4-letter</span>
                  </a>
                </div>
              </div>
              <div className="footer-search-terms">
                <div className="footer-term-box">
                  <a href="">
                    <span className="footer-term-box_span">5-letter</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-info">
            <div>
              <span>Copyright © 2022 Squadhelp Inc</span>
            </div>
            <div>
              <a href="">
                Squadhelp.com has a Shopper Approved rating of 4.9/5 based on
                2782 and reviews
              </a>
            </div>
            <div className="footer-social-contact">
              <a href="https://linkedin.com" target="_blank">
                <img src="./images/socialIcon/image.svg" alt="linkedIn" />
              </a>
              <a href="https://instagram.com" target="_blank">
                <img src="./images/socialIcon/instagram.svg" alt="instagram" />
              </a>
              <a href="https://twitter.com" target="_blank">
                <img src="./images/socialIcon/twitter.svg" alt="twitter" />
              </a>
              <a href="https://facebook.com" target="_blank">
                <img src="./images/socialIcon/facebook.svg" alt="facebook" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
    )
  }
  const topFunction=()=> {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  const openMenu = () => {
    if (
      document.getElementById('navUl').style.display === 'block' &&
      document.getElementById('regBtnNav').style.display === 'block'
    ) {
      document.getElementById('navUl').style.display = 'none';
      document.getElementById('regBtnNav').style.display = 'none';
      document.location.reload();
    } else {
      document.getElementById('navUl').style.display = 'block';
      document.getElementById('regBtnNav').style.display = 'block';
      createNav(dataText);
    }
  };

  /**Scroll Back To Top */
  window.onscroll = function () {
    scrollFunction();
  };

   function scrollFunction() {
    if (
      document.body.scrollTop > 620 ||
      document.documentElement.scrollTop > 620
    ) {
      document.getElementById('myBtn').style.display = 'block';
    } else {
      document.getElementById('myBtn').style.display = 'none';
    }
  }


  function createElement(
    tag = 'div',
    { classNames, listeners, attrs, styles } = {},
    ...children
  ) {
    const elem = document.createElement(tag);
    if (classNames) {
      elem.classList.add(...classNames);
    }
    if (listeners) {
      for (const [typeEvent, handler] of Object.entries(listeners)) {
        elem.addEventListener(typeEvent, handler);
      }
    }
    if (attrs) {
      for (const [typeAttr, valueAttr] of Object.entries(attrs)) {
        elem.setAttribute(typeAttr, valueAttr);
      }
    }
    if (styles) {
      for (const [nameStyle, valueStyle] of Object.entries(styles)) {
        elem.style[nameStyle] = valueStyle;
      }
    }
    elem.append(...children);
    return elem;
  }

   function createNav(dataText) {
    for (let i = 0; i <= dataText.length; i++) {
      let li = createElement(
        'li',
        { className: ['liNav'] },
        createElement('div', {}, document.createTextNode(dataText[i])),
        createElement(
          'div',
          {},
          createElement('img', {
            className: ['chevron'],
            attrs: {
              src: './images/icons/chevron-down.svg',
              alt: 'no image',
            },
          })
        )
      );
      document.getElementById('navUl').append(li);
    }
    let btn1 = createElement(
      'button',
      { classNames: ['btn1'] },
      document.createTextNode('Login')
    );
    let btn2 = createElement(
      'button',
      { classNames: ['btn2'] },
      document.createTextNode('Sign Up')
    );
    document.getElementById('regBtnNav').append(btn1);
    document.getElementById('regBtnNav').append(btn2);
  }
  useEffect(() => {    
    accordion(document.getElementsByClassName("course-panel"),
    document.getElementsByClassName("course-accordion"),
    document.getElementsByClassName("course-accordion active"));
    
    accordion(document.getElementsByClassName("course-panel2"),
    document.getElementsByClassName("course-accordion2"),
    document.getElementsByClassName("course-accordion2 active"));
    
    accordion(document.getElementsByClassName("course-panel3"),
    document.getElementsByClassName("course-accordion3"),
    document.getElementsByClassName("course-accordion3 active"));
    
    accordion(document.getElementsByClassName("course-panel4"),
    document.getElementsByClassName("course-accordion4"),
    document.getElementsByClassName("course-accordion4 active"));
  },[]);



  return (
   <>{pageBody()}</>
  );
};

export default HowItWork;
