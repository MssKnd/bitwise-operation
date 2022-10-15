import "./styles.css";
import { createMenuItems, User } from "./createMenuItem";
import { Menu } from "./Menu";
import { validateRoleFlug } from "./role";
import { validateFeatureFlug } from "./feature";
import { ChangeEvent, useState } from "react";

export default function App() {
  const [role, setRole] = useState(1);
  const [feature, setFeature] = useState(0);

  const handleFeature = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setFeature(feature | Number(value));
    } else {
      setFeature(feature & ~Number(value));
    }
  };

  const user: User = {
    name: "user",
    role: validateRoleFlug(role),
    feature: validateFeatureFlug(feature)
  };
  const menuItems = createMenuItems(user);

  return (
    <>
      <div>
        <div>
          権限:
          <select onChange={(e) => setRole(Number(e.target.value))}>
            <option value="1">管理者</option>
            <option value="2">編集者</option>
            <option value="4">閲覧者</option>
          </select>
        </div>
        <div>
          <div>
            <input type="checkbox" onChange={handleFeature} value="1" />
            メール通知　
            <input type="checkbox" onChange={handleFeature} value="2" />
            統計画面　
            <input type="checkbox" onChange={handleFeature} value="4" />
            多段階認証
          </div>
        </div>
      </div>

      <div className="App">
        <Menu menuItems={menuItems} />
      </div>
    </>
  );
}
