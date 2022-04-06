<script>
    import User from './User'
    import Stat from './Stat'
    import Tags from './Tags'
    import ProjectIcons from './ProjectIcons'
    import EntityIcon from './EntityIcon'

    export let entity;

    // TODO remove me
    const PROJECTS = [
        {
            "darkLogoUrl": null,
            "id": "34001",
            "logoUrl": "https://stage-sanbase-images.s3.amazonaws.com/uploads/logo64_contents-protocol.png",
            "name": "Contents Protocol",
            "ticker": "CPT"
        },
        {
            "darkLogoUrl": null,
            "id": "33904",
            "logoUrl": "https://stage-sanbase-images.s3.amazonaws.com/uploads/logo64_crypto-com-chain.png",
            "name": "Crypto.com Chain",
            "ticker": "CRO"
        },
        {
            "darkLogoUrl": null,
            "id": "34083",
            "logoUrl": "https://stage-sanbase-images.s3.amazonaws.com/uploads/logo64_krios.png",
            "name": "Krios",
            "ticker": "KRI"
        },
        {
            "darkLogoUrl": null,
            "id": "34081",
            "logoUrl": "https://stage-sanbase-images.s3.amazonaws.com/uploads/logo64_uni-coin.png",
            "name": "UNI COIN",
            "ticker": "UNI"
        },
        {
            "darkLogoUrl": null,
            "id": "34074",
            "logoUrl": null,
            "name": "Ocean Protocol",
            "ticker": "OCEAN"
        },
        {
        "darkLogoUrl": null,
            "id": "33568",
            "logoUrl": "https://stage-sanbase-images.s3.amazonaws.com/uploads/logo64_wax.png",
            "name": "WAX",
            "ticker": "WAXP"
        }
    ]
</script>

<div class="row">
  <div class="head">
    <div class="title">
      <h2>Quick 'Coin Health' audit template</h2>
      <ProjectIcons projects={PROJECTS} />
    </div>
    <EntityIcon type={entity} />
  </div>
  <div class="footer">
    <User />
    <Stat />
  </div>
</div>

<style>
  .row {
    display: flex;
    flex-direction: column;
    padding: 12px 24px;
    width: 100%;
    border: 1px solid var(--porcelain);
    border-top: none;
    cursor: pointer;
  }

  .row:hover {
    background-color: var(--athens);
  }

  .head {
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .title {
    display: flex;
    align-items: center;
  }

  h2 {
    font-family: "Proxima Nova";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    margin-right: 8px;
  }

  .footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
