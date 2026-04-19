import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | StorySizer",
  description:
    "Read StorySizer Terms of Service, including usage rules, limitations, and legal conditions.",
  alternates: {
    canonical: "/terms-of-use",
  },
  openGraph: {
    title: "Terms of Service | StorySizer",
    description:
      "Terms governing your access to and use of StorySizer.",
    url: "/terms-of-use",
    siteName: "StorySizer",
    type: "article",
  },
};

const TermsOfUsePage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Terms of Use"
        description="Terms governing access to and use of StorySizer."
      />

      <section className="pb-16 pt-8 md:pb-20 lg:pb-28">
        <div className="container">
          <div className="mx-auto max-w-[900px] rounded-sm border border-body-color/10 bg-white p-8 dark:border-white/10 dark:bg-dark sm:p-10">
            <p className="mb-6 text-base leading-relaxed text-body-color">
              <strong>Effective date:</strong> 19 April 2026
            </p>

            <h2 className="mb-3 text-xl font-bold text-black dark:text-white">1. Acceptance of These Terms</h2>
            <p className="mb-6 text-base leading-relaxed text-body-color">
              These Terms of Service ("Terms") govern your access to and use of the StorySizer web
              application and related services (the "Service"). By accessing or using the Service,
              you agree to be bound by these Terms. If you do not agree, you must not use the
              Service.
            </p>

            <h2 className="mb-3 text-xl font-bold text-black dark:text-white">2. About the Service</h2>
            <p className="mb-6 text-base leading-relaxed text-body-color">
              StorySizer is a web-based tool that helps users estimate software user stories in
              story points through a guided questionnaire designed to support more structured and
              objective evaluation. At the current stage, the Service includes single-user story
              estimation functionality. Additional features may be added in the future, including
              group estimation and comparison of differences across estimation parameters.
            </p>

            <h2 className="mb-3 text-xl font-bold text-black dark:text-white">3. Eligibility</h2>
            <p className="mb-6 text-base leading-relaxed text-body-color">
              You may use the Service only if you are legally permitted to do so under applicable
              law. If you use the Service on behalf of a company, team, or other organization, you
              represent that you have authority to bind that organization to these Terms.
            </p>

            <h2 className="mb-3 text-xl font-bold text-black dark:text-white">4. Accounts and Access</h2>
            <p className="mb-3 text-base leading-relaxed text-body-color">
              Access to the Service currently requires login via Google Single Sign-On.
            </p>
            <p className="mb-3 text-base leading-relaxed text-body-color">You are responsible for:</p>
            <ul className="mb-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-body-color">
              <li>Maintaining the security of your account.</li>
              <li>Any activity carried out through your account.</li>
              <li>Ensuring login information is accurate and up to date.</li>
            </ul>
            <p className="mb-6 text-base leading-relaxed text-body-color">
              We may suspend or terminate access if we reasonably believe that your use of the
              Service violates these Terms, creates security risks, or may expose us or others to
              liability.
            </p>

            <h2 className="mb-3 text-xl font-bold text-black dark:text-white">5. User Content</h2>
            <p className="mb-3 text-base leading-relaxed text-body-color">You may submit content including:</p>
            <ul className="mb-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-body-color">
              <li>User stories.</li>
              <li>Questionnaire responses.</li>
              <li>Estimation-related inputs and outputs.</li>
              <li>Support or crash-report messages.</li>
            </ul>
            <p className="mb-3 text-base leading-relaxed text-body-color">
              You retain responsibility for the content you submit.
            </p>
            <p className="mb-3 text-base leading-relaxed text-body-color">You represent and warrant that:</p>
            <ul className="mb-6 list-disc space-y-2 pl-6 text-base leading-relaxed text-body-color">
              <li>You have the right to submit the content.</li>
              <li>Your content does not violate applicable law or third-party rights.</li>
              <li>Your content does not include material you are not authorized to share.</li>
            </ul>

            <h2 className="mb-3 text-xl font-bold text-black dark:text-white">6. Confidential and Company Information Disclaimer</h2>
            <p className="mb-6 text-base leading-relaxed text-body-color">
              The Service is not guaranteed to be suitable for the storage or processing of
              confidential, trade secret, regulated, or otherwise sensitive business information. If
              you submit company-related content, you do so at your own risk and responsibility. You
              should only upload or enter material you are authorized to use in the Service. We
              disclaim responsibility for consequences arising from submission of confidential or
              proprietary content by users.
            </p>

            <h2 className="mb-3 text-xl font-bold text-black dark:text-white">7. Acceptable Use</h2>
            <p className="mb-3 text-base leading-relaxed text-body-color">You agree not to:</p>
            <ul className="mb-6 list-disc space-y-2 pl-6 text-base leading-relaxed text-body-color">
              <li>Use the Service for unlawful purposes.</li>
              <li>Interfere with or disrupt the Service.</li>
              <li>Attempt unauthorized access to accounts, systems, or data.</li>
              <li>Upload malicious code or harmful material.</li>
              <li>Misuse the Service in ways that damage, disable, or impair functionality.</li>
              <li>
                Use the Service to infringe intellectual property, privacy, or other rights of third
                parties.
              </li>
            </ul>

            <h2 className="mb-3 text-xl font-bold text-black dark:text-white">8. Open Source and Free Availability</h2>
            <p className="mb-6 text-base leading-relaxed text-body-color">
              StorySizer is currently provided free of charge and is intended to be open source. We
              may modify, improve, suspend, or discontinue the Service, in whole or in part, at any
              time, with or without notice. We are not obligated to maintain specific features,
              uptime levels, roadmap items, or release schedules.
            </p>

            <h2 className="mb-3 text-xl font-bold text-black dark:text-white">9. No Professional Advice</h2>
            <p className="mb-6 text-base leading-relaxed text-body-color">
              The Service is an estimation support tool for general informational and workflow
              purposes only. Story point outputs, questionnaire results, and related estimations are
              indicative only and should not be treated as guarantees, commitments, or professional
              advice.
            </p>

            <h2 className="mb-3 text-xl font-bold text-black dark:text-white">10. No Warranty</h2>
            <p className="mb-3 text-base leading-relaxed text-body-color">
              The Service is provided on an "as is" and "as available" basis. To the maximum extent
              permitted by law, we disclaim all warranties, express, implied, or statutory,
              including implied warranties of merchantability, fitness for a particular purpose,
              non-infringement, availability, accuracy, or reliability.
            </p>
            <p className="mb-3 text-base leading-relaxed text-body-color">We do not guarantee that:</p>
            <ul className="mb-6 list-disc space-y-2 pl-6 text-base leading-relaxed text-body-color">
              <li>The Service will be uninterrupted or error-free.</li>
              <li>Estimations will be accurate or suitable for any specific purpose.</li>
              <li>Defects will be corrected.</li>
              <li>The Service will always be secure or free from harmful components.</li>
            </ul>

            <h2 className="mb-3 text-xl font-bold text-black dark:text-white">11. Limitation of Liability</h2>
            <p className="mb-3 text-base leading-relaxed text-body-color">
              To the maximum extent permitted by applicable law, we shall not be liable for any
              indirect, incidental, special, consequential, exemplary, or punitive damages, or for
              any loss of profits, revenues, data, business opportunities, goodwill, or business
              interruption arising out of or related to the use of, or inability to use, the
              Service.
            </p>
            <p className="mb-6 text-base leading-relaxed text-body-color">
              To the maximum extent permitted by law, our total liability for any claim arising out
              of or relating to the Service is limited to the amount paid by you for the Service in
              the twelve months preceding the claim. Since the Service is currently free, that
              amount may be zero. Nothing in these Terms excludes or limits liability where such
              limitation is prohibited by law.
            </p>

            <h2 className="mb-3 text-xl font-bold text-black dark:text-white">12. Intellectual Property</h2>
            <p className="mb-6 text-base leading-relaxed text-body-color">
              We retain all rights, title, and interest in and to the Service itself, excluding user
              content and excluding third-party open source components subject to their respective
              licenses. These Terms do not grant you ownership of the Service or any of our
              branding, names, logos, or other proprietary materials.
            </p>

            <h2 className="mb-3 text-xl font-bold text-black dark:text-white">13. Feedback</h2>
            <p className="mb-6 text-base leading-relaxed text-body-color">
              If you send us suggestions, ideas, bug reports, or feedback regarding the Service, you
              agree that we may use them without restriction and without any obligation to
              compensate you.
            </p>

            <h2 className="mb-3 text-xl font-bold text-black dark:text-white">14. Privacy</h2>
            <p className="mb-6 text-base leading-relaxed text-body-color">
              Your use of the Service is also governed by the Privacy Policy, which explains how
              personal data is processed.
            </p>

            <h2 className="mb-3 text-xl font-bold text-black dark:text-white">15. Termination</h2>
            <p className="mb-3 text-base leading-relaxed text-body-color">You may stop using the Service at any time.</p>
            <p className="mb-3 text-base leading-relaxed text-body-color">We may suspend or terminate access if:</p>
            <ul className="mb-6 list-disc space-y-2 pl-6 text-base leading-relaxed text-body-color">
              <li>You breach these Terms.</li>
              <li>We are required to do so for legal reasons.</li>
              <li>Continued operation of the Service is no longer feasible.</li>
              <li>Your use creates risk or harm to the Service, us, or others.</li>
            </ul>

            <h2 className="mb-3 text-xl font-bold text-black dark:text-white">16. Changes to the Service or Terms</h2>
            <p className="mb-6 text-base leading-relaxed text-body-color">
              We may update the Service and these Terms from time to time. If we make material
              changes, we may post updated Terms on the website. By continuing to use the Service
              after updated Terms take effect, you agree to the revised Terms.
            </p>

            <h2 className="mb-3 text-xl font-bold text-black dark:text-white">17. Governing Law</h2>
            <p className="mb-6 text-base leading-relaxed text-body-color">
              These Terms are governed by the laws of Italy, excluding conflict-of-law rules.
            </p>

            <h2 className="mb-3 text-xl font-bold text-black dark:text-white">18. Dispute Resolution and Forum</h2>
            <p className="mb-6 text-base leading-relaxed text-body-color">
              Any dispute arising out of or in connection with these Terms or the Service shall be
              subject to the jurisdiction of the competent courts of Italy, unless mandatory
              consumer protection laws provide otherwise.
            </p>

            <h2 className="mb-3 text-xl font-bold text-black dark:text-white">19. Contact</h2>
            <p className="text-base leading-relaxed text-body-color">
              Francesco Maria Falini
              <br />
              francescomaria.falini@gmail.com
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsOfUsePage;
