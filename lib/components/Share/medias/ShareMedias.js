import React from 'react';
import cx from 'classnames';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import { track } from 'san-webkit/lib/analytics';
import { trackShareFormSubmit } from 'san-webkit/lib/analytics/events/interaction';
import TwitterIcon from './TwitterIcon';
import DiscordIcon from './DiscordIcon';
import RedditIcon from './RedditIcon';
import TelegramIcon from './TelegramIcon';
import { AlertsEvents } from '../../../ducks/Alert/analytics';
import styles from './ShareMedias.module.css';
const SECRET_LINK_TAG = '__SECRET_LINK_TAG__';
const SECRET_TEXT_TAG = '__SECRET_TEXT_TAG__';
const SECRET_TITLE_TAG = '__SECRET_TITLE_TAG__';
const mediasToShare = [{
  icon: 'twitter',
  href: `https://twitter.com/home?status=${SECRET_TEXT_TAG}%0Alink%3A%20${SECRET_LINK_TAG}`,
  className: styles.twitter,
  title: 'Twitter'
}, {
  icon: 'facebook',
  href: `https://www.facebook.com/sharer/sharer.php?u=${SECRET_LINK_TAG}`,
  className: styles.facebook,
  title: 'Facebook'
}, {
  icon: 'linked-in',
  href: `https://www.linkedin.com/shareArticle?mini=true&title=${SECRET_TITLE_TAG}&summary=${SECRET_TEXT_TAG}&source=santiment.net&url=${SECRET_LINK_TAG}`,
  className: styles.linkedin,
  title: 'LinkedIn'
}, {
  icon: 'telegram',
  href: `https://telegram.me/share/url?text=${SECRET_TEXT_TAG}&url=${SECRET_LINK_TAG}`,
  className: styles.telegram,
  title: 'Telegram'
}, {
  icon: 'reddit',
  href: `https://reddit.com/submit?title=${SECRET_TEXT_TAG}&url=${SECRET_LINK_TAG}`,
  className: styles.reddit,
  title: 'Reddit'
}];
const mobileMedias = [{
  id: 'twitter',
  Icon: TwitterIcon,
  href: `https://twitter.com/home?status=${SECRET_TEXT_TAG}%0Alink%3A%20${SECRET_LINK_TAG}`,
  title: 'Twitter'
}, {
  id: 'discord',
  Icon: DiscordIcon,
  href: `https://santiment.net/discord`,
  title: 'Discord'
}, {
  id: 'reddit',
  Icon: RedditIcon,
  href: `https://reddit.com/submit?title=${SECRET_TEXT_TAG}&url=${SECRET_LINK_TAG}`,
  title: 'Reddit'
}, {
  id: 'telegram',
  Icon: TelegramIcon,
  href: `https://telegram.me/share/url?text=${SECRET_TEXT_TAG}&url=${SECRET_LINK_TAG}`,
  title: 'Telegram'
}];

const ShareMedias = ({
  shareLink,
  shareTitle = '',
  shareText = '',
  showTitle = true,
  isDisabled,
  classes = {},
  isAlert,
  isMobile,
  isDashboard
}) => {
  const encodedTitle = encodeURIComponent(shareTitle);
  const encodedText = encodeURIComponent(shareText);
  const encodedLink = encodeURIComponent(shareLink);

  if (isMobile) {
    return /*#__PURE__*/React.createElement("div", {
      className: styles.mediaWrapper
    }, mobileMedias.map(({
      id,
      Icon,
      href,
      title,
      className
    }) => /*#__PURE__*/React.createElement("a", {
      key: href,
      href: href.replace(SECRET_LINK_TAG, encodedLink).replace(SECRET_TEXT_TAG, encodedText).replace(SECRET_TITLE_TAG, encodedTitle),
      target: "_blank",
      rel: "noopener noreferrer",
      className: cx(styles.mediaBtn, 'btn body-2 row v-center', isDisabled && styles.disabled),
      onClick: e => {
        trackShareFormSubmit({
          url: shareLink,
          media: id
        });
        if (isDisabled) e.preventDefault();
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      className: cx(styles.icon, className)
    }), /*#__PURE__*/React.createElement("span", null, title))));
  }

  if (isDashboard) {
    return /*#__PURE__*/React.createElement("div", {
      className: cx(styles.wrapper, 'row')
    }, mobileMedias.map(({
      id,
      Icon,
      href
    }) => /*#__PURE__*/React.createElement("a", {
      key: href,
      href: href.replace(SECRET_LINK_TAG, encodedLink).replace(SECRET_TEXT_TAG, encodedText),
      target: "_blank",
      rel: "noopener noreferrer",
      className: cx(styles.shareBtn, 'btn row hv-center'),
      onClick: () => {
        trackShareFormSubmit({
          url: shareLink,
          media: id
        });
      }
    }, /*#__PURE__*/React.createElement(Icon, null))));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.block, classes.medias)
  }, showTitle && /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, "Share on social media"), /*#__PURE__*/React.createElement("div", {
    className: styles.share
  }, mediasToShare.map(({
    icon,
    href,
    className
  }) => /*#__PURE__*/React.createElement(Button, {
    key: icon,
    variant: "flat",
    as: "a",
    disabled: isDisabled,
    className: cx(styles.btn, classes.mediaBtn),
    target: "_blank",
    rel: "noopener noreferrer",
    href: href.replace(SECRET_LINK_TAG, encodedLink).replace(SECRET_TEXT_TAG, encodedText).replace(SECRET_TITLE_TAG, encodedTitle),
    onClick: () => {
      trackShareFormSubmit({
        url: shareLink,
        media: icon
      });

      if (isAlert) {
        track.event(AlertsEvents.ClickCopyAlertLink);
      }
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    type: icon,
    className: cx(styles.icon, className, classes.mediaIcon)
  })))));
};

export default ShareMedias;