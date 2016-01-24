{-# LANGUAGE OverloadedStrings #-}
import XMonad
import XMonad.Layout.Grid
import XMonad.Config.Kde
import XMonad.Hooks.DynamicLog
import XMonad.Util.WindowProperties (getProp32s)

import qualified DBus as D
import qualified DBus.Client as D
import qualified Codec.Binary.UTF8.String as UTF8

main :: IO ()
main = do
  dbus <- D.connectSession
  getWellKnownName dbus
  xmonad $ kde4Config
    { logHook = dynamicLogWithPP (prettyPrinter dbus)
    , manageHook = ((className =? "krunner") >>= return . not --> manageHook kde4Config)
                   <+> (kdeOverride --> doFloat)
    , layoutHook = layoutHook kde4Config ||| Grid
    }

kdeOverride :: Query Bool
kdeOverride = ask >>= \w -> liftX $ do
  override <- getAtom "_KDE_NET_WM_WINDOW_TYPE_OVERRIDE"
  wt <- getProp32s "_NET_WM_WINDOW_TYPE" w
  return $ maybe False (elem $ fromIntegral override) wt

prettyPrinter :: D.Client -> PP
prettyPrinter dbus = defaultPP {
  ppOutput = dbusOutput dbus
  , ppCurrent = wrap "[" "]"
  , ppSep = " | "
  }

getWellKnownName :: D.Client -> IO ()
getWellKnownName dbus = do
  D.requestName dbus (D.busName_ "org.xmonad.Log")
    [D.nameAllowReplacement, D.nameReplaceExisting, D.nameDoNotQueue]
  return ()

dbusOutput :: D.Client -> String -> IO ()
dbusOutput dbus str = do
  let signal = (D.signal "/org/xmonad/Log" "org.xmonad.Log" "Update") {
        D.signalBody = [D.toVariant (UTF8.decodeString str)]
        }
  D.emit dbus signal
