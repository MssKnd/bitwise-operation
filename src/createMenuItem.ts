import { canUseFeature, FEATURE, FeatureFlug } from "./feature";
import { canUseRole, mergeRoleFlug, ROLE, RoleFlug } from "./role";

type User = {
  name: string;
  role: RoleFlug;
  feature: FeatureFlug;
};

type MenuItem = {
  label: string;
  url: string;
  canUse: boolean;
};

// role
const editorOrMore = mergeRoleFlug(ROLE.ADMINISTRATOR, ROLE.EDITOR); // 1 | 2 = 3 (0011)
const canUseEditorOrMore = canUseRole(editorOrMore);

// feature
const canUseMailNotification = canUseFeature(FEATURE.MAIL_NOTIFICATION);
const canUseMailStatictics = canUseFeature(FEATURE.STATICTICS);
const canUseMultiAuthentication = canUseFeature(FEATURE.MULTI_AUTHENTICATION);

const createMenuItems = (user: User) => {
  const menuItems: MenuItem[] = [
    {
      label: "ダッシュボード",
      url: "/dashboard",
      canUse: true
    },
    {
      label: "メール通知設定",
      url: "/dashboard",
      canUse:
        canUseEditorOrMore(user.role) && canUseMailNotification(user.feature)
    },
    {
      label: "統計画面",
      url: "/statictics",
      canUse:
        canUseEditorOrMore(user.role) && canUseMailStatictics(user.feature)
    },
    {
      label: "多段階認証設定",
      url: "/auth-setting",
      canUse:
        canUseEditorOrMore(user.role) && canUseMultiAuthentication(user.feature)
    },
    {
      label: "テナント設定",
      url: "/setting",
      canUse: canUseEditorOrMore(user.role)
    }
  ];
  return menuItems.filter((item) => item.canUse);
};

export type { MenuItem, User };
export { createMenuItems };
