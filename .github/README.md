# github actions

> public リポジトリだと無料で使い放題です。

> private リポジトリでも無料枠が 2,000 分/月もあります。

これらのすべてのジョブが成功で終わらなかった場合、マージさせない

Settings > branches > Require status checks to pass before merging > Require branches to be up to date before merging

- 参考記事
  - https://zenn.dev/praha/articles/9e561bdaac1d23
  - https://github.com/looks-to-me/looks-to-me

# github-script

- script ファイルを切る場合は、もちろんだが checkout しないと失敗する
- github-script で参照できるコンテキスト（github, context, core など）はこちらのドキュメントに記載がある
- 例えば context.repo ってどうやって参照しているか気になったが[こちら](https://github.com/actions/toolkit/blob/master/packages/github/src/context.ts)のファイルで定義されている
- github は rest が参照できるようになっていて、検証で実際に使っている api 情報は以下になる
  - https://docs.github.com/ja/rest/issues/assignees?apiVersion=2022-11-28#add-assignees-to-an-issue
  - https://docs.github.com/ja/rest/issues/comments?apiVersion=2022-11-28#create-an-issue-comment
- JSDoc で型定義して TypeScript の恩恵を受ける
  - https://zenn.dev/ikoamu/articles/5b4c646376b60e
  - https://zenn.dev/azukiazusa/articles/c89d4bdc7dacf2#%E3%82%A4%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%88%E5%9E%8B
- やり方は違うけど型定義に関しては公式ドキュメントでも触れている
  - https://github.com/actions/github-script?tab=readme-ov-file#use-scripts-with-jsdoc-support
- PR にコメントしたいときは`github.rest.issues.createComment`を使う。issues はあまり関係なく、トリガーが pull_request であれば PR にコメントする。参考にしたのは[こちら](https://blog.kinto-technologies.com/posts/2023-12-03-AutoReviewersGitHubActions/)の記事

# CodeOwner

- コードオーナーでレビュワー強制にしようと思ったけど自分を指定するのはできないのでスキップする

- https://docs.github.com/ja/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
- https://zenn.dev/bicstone/articles/code-owners-github
- https://qiita.com/FumiyaShibusawa/items/c7a3ff4d0793ca2d281f

# 再利用可能な action について

composite action, workflow_run, workflow_call などがあるが、参照できるコンテキストが異なったり期待値と異なるケースが多く感じるので inputs が不要だったり、参照するコンテキストが不要な場合に切り出すのがいいと思った

例えば setup 系とかはいいかなと思った

https://docs.github.com/ja/enterprise-cloud@latest/actions/using-workflows/reusing-workflows

じゃあ直前に実行されたワークフローの情報を参照するには？（workflow_run）

- イベント名 -> context.payload.workflow_run.event
- ワークフロー名 -> context.payload.workflow_run.name
- ワークフローの run_id -> context.payload.workflow_run.id
- ワークフローの可否 -> context.payload.workflow_run.conclusion

https://swfz.hatenablog.com/entry/2022/04/24/183151

# Permission

- 場合によっては permission も気にする必要があるのか。createComment で遭遇
- ちなみに何の permission かというと GITHUB_TOKEN である
  - 詳細は[こちら](https://docs.github.com/en/actions/using-jobs/assigning-permissions-to-jobs)

# job summary

- 2022 年 5 月 9 日に GitHub Actions Job Summaries がリリースされた
- success なのにどこに出てる？で躓いた、けどよく読めば簡単
- jest coverage を出すとかで使われているぽい

- 参考記事
  - https://developer.mamezou-tech.com/blogs/2022/05/14/github-actions-job-summaries/
  - https://blog.chick-p.work/blog/github-actions-job-summary
  - https://github.blog/2022-05-09-supercharging-github-actions-with-job-summaries/

# github action context

https://docs.github.com/ja/actions/learn-github-actions/contexts

個人的にはコンテキストが gha のコアだと思っていて、これがないと表示するための情報がなくなるから。でも場合によっては参照できなかったりするので注意が必要

で、なぜコンテキストが複雑になるかというと actions（slack-github-action とか github-script とか）を作る時に使用される[GitHub Actions Toolkit](https://github.com/actions/toolkit/tree/master)が原因で、内部的に参照されるコンテキストが github action context と異なるから。しかもプロパティ名も同じだからかなり致命的に感じる

誰かが作った actions を利用する場合は参照が異なることを念頭に入れることが必要そう

> GitHub Actions で自作アクションや他のアクションでコードを書く場合(TypeScript)
> @actions/github の context に色々入っているのでそれを、参照して色々行うことが多いかと思う

↑[こちら](https://swfz.hatenablog.com/entry/2022/04/24/183151)から引用

# slack github action

- [slack-github-action](https://github.com/slackapi/slack-github-action)
- いろんな野良の slack notification があるが公式の出している actions を使った方が良いが、思っている以上に罠が多い
- github actions context が payload-file-path で指定したファイルと参照している値が異なる
  - [payload-file-path](https://github.com/slackapi/slack-github-action/blob/main/src/slack-send.js#L41-L54)
  - 参照が[@actions/github](https://github.com/actions/toolkit/tree/main/packages/github)の[context.ts](https://github.com/actions/toolkit/blob/main/packages/github/src/context.ts)に変わっている
  - [参考記事](https://qiita.com/gachi-muchi-engineer/items/0880535896dccce4f483)
- なのでファイル分割しない限りは期待値になるのでそこだけ注意
- https://app.slack.com/block-kit-builder/
- この[issue](https://github.com/slackapi/slack-github-action/issues/203)が結構コアなのだと思う

# TODO

- 他人の repo を参照する実装
  - https://gist.github.com/noirbizarre/b09f562ba9252dd24f9afdf9d46a7944
