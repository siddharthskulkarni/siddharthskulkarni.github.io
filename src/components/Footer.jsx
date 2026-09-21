import { Icon } from '@iconify/react';
import strings from '../strings.json';

const SocialIcon = ({ iconName }) => {
  const iconMap = {
    email: 'simple-icons:gmail',
    // rss: 'simple-icons:rss',
    x: 'simple-icons:x',
    linkedin: 'simple-icons:linkedin',
    github: 'simple-icons:github',
    substack: 'simple-icons:substack',
  };

  const icon = iconMap[iconName] || 'simple-icons:link';

  return <Icon icon={icon} width={10} height={10} className="transition-colors" aria-hidden="true" />;
};

const Footer = () => {
    return (
        <footer className="my-16 bottom-0 pt-8 border-t border-gray-200 max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between gap-4 text-sm text-gray-500">
          <div>
            <span className="font-[verdana]">{strings.footer.copyright}</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {strings.footer.socials.map((social) => {
              const isExternal = /^https?:\/\//i.test(social.url);
              return (
                <a
                  key={social.label}
                  href={social.url}
                  {...(isExternal
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={social.label}
                >
                  <SocialIcon iconName={social.icon} />
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    );
};

export default Footer;







