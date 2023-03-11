# Change Log

## 1.0.0 (Mar 11, 2023)

* upgrade libs

## 0.1.32 (Jan 4, 2023)

* upgrade libs

## 0.1.31 (May 21, 2022)

* enhancement - Update README.md. See [#127](https://github.com/kasecato/vscode-docomment/pull/127).
* bug fix - Issue with tuples and params. See [#129](https://github.com/kasecato/vscode-docomment/issues/129).
* upgrade libs

## 0.1.30 (Oct 30, 2021)

* enhancement - Support Visual Studio Code Web
* upgrade libs

## 0.1.20 (Dec 18, 2020)

* deplicated announcement
* upgrade libs

## 0.1.19 (Nov 14, 2020)

* bug fix - Type is detected as parameter. See [#113](https://github.com/kasecato/vscode-docomment/issues/113).
* bug fix - Generates param tags for inner tuple type instead of method parameters. See [#115](https://github.com/kasecato/vscode-docomment/issues/115).
* upgrade libs

## 0.1.18 (Aug 12, 2020)

* enhancement - add support for Blazor .razor files. See [#110](https://github.com/kasecato/vscode-docomment/issues/110).
* upgrade libs

## 0.1.17 (July 28, 2020)

* bug fix - extra "///" before comment block. See [#108](https://github.com/kasecato/vscode-docomment/issues/108).
* revert - ctrl-enter (insert line below, insert line above) in middle of line not adding `///`. See [#98](https://github.com/kasecato/vscode-docomment/issues/98).

## 0.1.16 (July 27, 2020)

* bug fix - ctrl-enter (insert line below, insert line above) in middle of line not adding `///`. See [#98](https://github.com/kasecato/vscode-docomment/issues/98).
* bug fix - Not working activateOnEnter. See [#104](https://github.com/kasecato/vscode-docomment/issues/104).
* bug fix - Strange tab indent. See [#106](https://github.com/kasecato/vscode-docomment/issues/106).

## 0.1.15 (July 26, 2020)

* bug fix - ctrl-enter (insert line below, insert line above) in middle of line not adding `///`. See [#98](https://github.com/kasecato/vscode-docomment/issues/98).
* bug fix - Delimited comment "/**" doen't work. See [#100](https://github.com/kasecato/vscode-docomment/issues/100).

## 0.1.14 (July 20, 2020)

* bug fix - Enter behind &lt;summary&gt;, input too many "///"！. See [#95](https://github.com/kasecato/vscode-docomment/issues/95).
* upgrade libs

## 0.1.13 (June 28, 2020)

* bug fix - Extra `///` added when undoing line deletion. See [#93](https://github.com/kasecato/vscode-docomment/issues/93).

## 0.1.12 (June 19, 2020)

* bug fix - Generation for Expression-bodied methods fails in most cases. See [#91](https://github.com/kasecato/vscode-docomment/issues/91).
* upgrade libs

## 0.1.11 (May 20, 2020)

* bug fix - Erroneous code comments on complex function signatures. See [#88](https://github.com/kasecato/vscode-docomment/issues/88).

## 0.1.10 (May 19, 2020)

* bug fix - When using @ prefixed identifiers, the prefix should be removed in the generated param name. See [#86](https://github.com/kasecato/vscode-docomment/issues/86).
* upgrade libs

## 0.1.9 (March 26, 2020)

* upgrade libs

## 0.1.8 (June 16, 2019)

* bug fix - Should not generate typeparam for non-generic classes. See [#76](https://github.com/kasecato/vscode-docomment/issues/76).

## 0.1.7 (May 20, 2019)

* bug fix - Update packages to fix vulnerabilities. See [#77](https://github.com/kasecato/vscode-docomment/pull/77).

## 0.1.6 (Feb 24, 2019)

* bug fix - Support delimited comment syntax /** */? See [#75](https://github.com/kasecato/vscode-docomment/issues/75).

## 0.1.5 (Feb 23, 2019)

* bug fix - Support delimited comment syntax /** */? See [#75](https://github.com/kasecato/vscode-docomment/issues/75).

## 0.1.4 (Feb 23, 2019)

* enhancement - Upgrade libraries.
* enhancement - Support delimited comment syntax /** */? See [#75](https://github.com/kasecato/vscode-docomment/issues/75).

## 0.1.3 (Feb 1, 2019)

* enhancement - Upgrade libraries.
* bug fix - Correct minor typo. See [#73](https://github.com/kasecato/vscode-docomment/pull/73).

## 0.1.2 (July 11, 2018)

* enhancement - Add user-controllable options. See [#68](https://github.com/kasecato/vscode-docomment/issues/68).

## 0.1.1 (July 7, 2018)

* bug fix - Incorrect for properties. See [#68](https://github.com/kasecato/vscode-docomment/issues/68).

## 0.1.0 (May 3, 2018)

* enhancement - Please also generate documentation for generic type. See [#32](https://github.com/kasecato/vscode-docomment/issues/32).

## 0.0.19 (Apr 30, 2018)

* bug fix - I cant get this extension working. See [#62](https://github.com/kasecato/vscode-docomment/issues/62).

## 0.0.18 (Apr 7, 2018)

* bug fix - It's wrong in this case. See [#52](https://github.com/kasecato/vscode-docomment/issues/52).

## 0.0.17 (Jun 30, 2017)

* bug fix - Comments for Constructor not working. See [#49](https://github.com/kasecato/vscode-docomment/issues/49).

## 0.0.16 (Jun 25, 2017)

* bug fix - Fix some duping. See [#47](https://github.com/kasecato/vscode-docomment/pull/47).
* bug fix - Bug: return tag missing. See [#45](https://github.com/kasecato/vscode-docomment/issues/45).

## 0.0.15 (May 19, 2017)

* enhancement - Autocomplete order/priority? See [#41](https://github.com/kasecato/vscode-docomment/issues/41).

## 0.0.14 (February 15, 2017)

* bug fix - 3 Attributes bug. See [#34](https://github.com/kasecato/vscode-docomment/issues/34).
* bug fix - Please add support for generic types restrains. See [#35](https://github.com/kasecato/vscode-docomment/issues/35).

## 0.0.13 (January 31, 2017)

* bug fix - Parameters are not returned. See [#32](https://github.com/kasecato/vscode-docomment/issues/32).

## 0.0.12 (January 21, 2017)

* bug fix - Output document puts cursor in wrong place. See [#26](https://github.com/kasecato/vscode-docomment/issues/26).
* bug fix - Wrapping lines in the middle of text inserts /// in the wrong place. See [#29](https://github.com/kasecato/vscode-docomment/issues/29).

## 0.0.11 (January 11, 2017)

* bug fix - Auto-generated /// on the new line inside &lt;summary&gt; tag. See [#25](https://github.com/kasecato/vscode-docomment/issues/25), [#26](https://github.com/kasecato/vscode-docomment/issues/26).

## 0.0.10 (December 29, 2016)

* bug fix - Parameters not correctly identified when documenting constructor which chains to a base class constructor. See [#22](https://github.com/kasecato/vscode-docomment/issues/22).

## 0.0.9 (December 11, 2016)

* bug fix - Expansion is triggering in a lot of cases when it shouldn't. See [#16](https://github.com/kasecato/vscode-docomment/issues/16).

## 0.0.8 (December 2, 2016)

* bug fix - Adds extra param for `Func<T, bool>`. See [#19](https://github.com/kasecato/vscode-docomment/issues/19).

## 0.0.7 (July 11, 2016)

## 0.0.6 (Jun 24, 2016)

## 0.0.5 (April 2, 2016)

## 0.0.4 (February 7, 2016)

## 0.0.3 (January 24, 2016)

## 0.0.2 (January 14, 2016)

## 0.0.1 (January 4, 2016)
