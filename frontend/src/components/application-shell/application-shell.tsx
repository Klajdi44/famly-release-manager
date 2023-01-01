import { Link, useNavigate } from "react-router-dom";
import React, { useState, ReactNode, useCallback, useMemo } from "react";
import {
  AppShell,
  Navbar,
  MediaQuery,
  Burger,
  useMantineTheme,
  Header,
  Flex,
  Switch,
  Image,
} from "@mantine/core";
import {
  IconSettings,
  IconLogout,
  IconToggleRight,
  IconSunHigh,
  IconMoonStars,
} from "@tabler/icons";

import { useStyles } from "./styles";
import { resetTokens } from "../../util/jwt";
import { useGlobalState } from "../../hooks/use-global-state/use-global-state";

const data = [
  { link: "/", label: "Release toggles", icon: IconToggleRight },
  { link: "/segments", label: "Segments", icon: IconSettings },
];

type ApplicationShellProps = {
  children: ReactNode;
  shouldRender?: boolean;
};

const ApplicationShell = ({
  children,
  shouldRender = true,
}: ApplicationShellProps) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState("Billing");
  const navigate = useNavigate();
  const handleOpen = useCallback(() => setOpened(opened => !opened), []);

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    resetTokens();
    navigate("/login", { replace: true });
  };

  const handleSetActive = useCallback(
    (label: string) => () => {
      setActive(label);
      setOpened(prevState => !prevState);
    },
    []
  );

  const { classes, cx } = useStyles();
  const [state, dispatch] = useGlobalState();

  const links = useMemo(
    () =>
      data.map(link => (
        <Link
          to={link.link}
          key={link.label}
          className={cx(classes.link, {
            [classes.linkActive]: link.label === active,
          })}
          onClick={handleSetActive(link.label)}
        >
          <link.icon className={classes.linkIcon} stroke={1.5} />
          <span>{link.label}</span>
        </Link>
      )),
    [
      active,
      classes.link,
      classes.linkActive,
      classes.linkIcon,
      cx,
      handleSetActive,
    ]
  );

  const handleToggleColorScheme = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: "THEME_CHANGE_COLOR_SCHEME",
      payload: event.target.checked ? "dark" : "light",
    });
  };

  if (shouldRender === false) {
    return <AppShell>{children}</AppShell>;
  }

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      header={
        <Header height={{ base: 60, md: 70 }} pr="md" pl="md">
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Flex justify="space-between" align="center">
              <Link to="/">
                <Image
                  src={"Famly-Logo-WhiteBG.svg"}
                  alt="famly logo"
                  width={120}
                  mt="lg"
                />
              </Link>
              <Switch
                checked={state.colorScheme === "dark"}
                size="md"
                onLabel={<IconMoonStars size={18} />}
                offLabel={<IconSunHigh size={20} />}
                color="gray"
                onChange={handleToggleColorScheme}
              />
            </Flex>
          </MediaQuery>

          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger
              opened={opened}
              onClick={handleOpen}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
              mt="md"
            />
          </MediaQuery>
        </Header>
      }
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Navbar.Section grow>{links}</Navbar.Section>

          <Navbar.Section className={classes.footer}>
            <a href="#" className={classes.link} onClick={handleLogout}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </a>
          </Navbar.Section>
        </Navbar>
      }
    >
      {children}
    </AppShell>
  );
};

export default ApplicationShell;
