"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  // const router = useRouter();
  const settingsList = [
    {
      "name": "General",
      "options": [
        {
          "name": "Scan library automatically",
          "type": "checkbox",
          "location": "autoScanLibrary"
        }
      ]
    },
    {
      "name": "Player Behaviour",
      "options": [
        {
          "name": "Auto-skip Intro",
          "type": "checkbox",
          "location": "autoSkipIntro"
        },
        {
          "name": "Auto-skip Credits",
          "type": "checkbox",
          "location": "autoSkipCredits"
        },
        {
          "name": "Force Subtitles",
          "type": "checkbox",
          "location": "forceSubtitles"
        }
      ]
    }
  ];

  const [isDirty, setIsDirty] = useState(false);
  const [dirtySettings, setDirtySettings] = useState<any[]>([]);

  const setDirtySetting = async (settingName: string, value: any) => {
    let found = false;
    for(let i = 0; i < dirtySettings.length; i++) {
      if(dirtySettings[i].name == settingName) {
        dirtySettings[i].value = value;
        found = true;
      }
    }

    if(!found) {
      setDirtySettings([
        ...dirtySettings,
        {
          name: settingName,
          value: new String(value)
        }
      ])
    }
  }

  const getSetting = (name: string) => {
    const settingValue = localStorage.getItem(name);
    const dirtySettingValue = dirtySettings.find((elem) => elem.name === name);
    if(dirtySettingValue) {
      return dirtySettingValue.value;
    }
    return settingValue;
  }

  const getDirtySetting = (name: string) => {
    for (const setting of dirtySettings) {
      if(setting.name === name) {
        return setting.value;
      }
    }

    return getSetting(name);
  }

  const saveSettings = () => {
    dirtySettings.map((setting) => {
      localStorage.setItem(setting.name, setting.value);
    });

    setIsDirty(false);
  }

  const settingsElem: JSX.Element[] = [];

  for (const category of settingsList) {

    settingsElem.push(
      <p className="font-bold text-2xl pt-5" key={category.name}>{category.name}</p>
    )

    for (const setting of category.options) {
      settingsElem.push(
        <div className="pt-1" key={setting.location}>
          <p>{setting.name} &nbsp;
            <input 
              type="checkbox"
              checked={getDirtySetting(setting.location) == "true"}
              onClick={() => setIsDirty(true)}
              onChange={(value) => { setDirtySetting(setting.location, value.target.checked)}}
              key={"value-" + setting.location}
            ></input>
          </p>
        </div>
      );
    }
  }

  return <>
    <div className="w-full absolute top-16 ml-20 flex flex-col mr-20 pt-10">
      <div className="gap-2 pt-5">
        <p className="font-bold text-5xl">Settings</p>
      </div>

      {settingsElem}

      <div className="gap-2 pt-5">
        <Button 
          disabled={!isDirty}
          onClick={saveSettings}>
            Save Options
        </Button>
      </div>
    </div>
  </>;
}
