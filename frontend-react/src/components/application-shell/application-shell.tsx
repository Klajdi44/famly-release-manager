import { Link } from "react-router-dom";
import { useState, ReactNode, useCallback, useMemo } from "react";
import {
  AppShell,
  Navbar,
  MediaQuery,
  Burger,
  useMantineTheme,
  Header,
} from "@mantine/core";
import {
  IconSettings,
  Icon2fa,
  IconSwitchHorizontal,
  IconLogout,
  IconHome,
} from "@tabler/icons";

import { useStyles } from "./styles";

const data = [
  { link: "/", label: "Home", icon: IconHome },
  { link: "", label: "Authentication", icon: Icon2fa },
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

  const handleOpen = useCallback(() => setOpened(opened => !opened), []);

  const handleSetActive = useCallback(
    (label: string) => () => setActive(label),
    []
  );

  const { classes, cx } = useStyles();

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
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Navbar.Section grow>{links}</Navbar.Section>

          <Navbar.Section className={classes.footer}>
            <a
              href="#"
              className={classes.link}
              onClick={event => event.preventDefault()}
            >
              <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
              <span>Change account</span>
            </a>

            <a
              href="#"
              className={classes.link}
              onClick={event => event.preventDefault()}
            >
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </a>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={handleOpen}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default ApplicationShell;
