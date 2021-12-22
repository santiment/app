import React, { useEffect, useState } from "react";
import Input from "@santiment-network/ui/Input";
import SourceToggle from "../SourceToggle";
import TriggerChannelSettings from "../../../../../../../../Signals/signalFormManager/signalCrudForm/formParts/channels/TriggerChannelSettings";
import { useCheckTelegramValid } from "../../../../../../../hooks/useCheckTelegramValid";
import styles from "../../ChannelsSelector.module.scss";

const TelegramToggle = ({
  disabled,
  isActive,
  onChange,
  telegram,
  value,
  setValue
}) => {
  const [telegramChat, setTelegramChat] = useState(
    telegram ? telegram.telegram_channel : ""
  );
  const { data } = useCheckTelegramValid({
    chatId: telegramChat
  });

  useEffect(() => {
    if (data && data.isTelegramChatIdValid) {
      const updatedChannels = value.filter(item =>
        typeof item === "string"
          ? item !== "telegram"
          : !("telegram_channel" in item)
      );

      setValue([
        ...updatedChannels,
        {
          telegram_channel: telegramChat
        }
      ]);
    }
  }, [telegramChat, data]);

  const isError = telegramChat && data && !data.isTelegramChatIdValid;

  return (
    <SourceToggle
      disabled={disabled}
      isActive={isActive}
      onChange={onChange}
      label={
        <>
          Telegram
          <TriggerChannelSettings
            showTrigger={disabled}
            trigger={
              <div className={styles.channelSettingsTrigger}>
                Enable notifications
              </div>
            }
          />
        </>
      }
    >
      <Input
        placeholder="@"
        value={telegramChat}
        onChange={e => setTelegramChat(e.target.value)}
        disabled={!isActive || disabled}
        isError={isError}
        errorText={isError && "Invalid telegram ID"}
      />
    </SourceToggle>
  );
};

export default TelegramToggle;
