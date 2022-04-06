<script>
    import User from './User'
    import Stat from './Stat'
    import Tags from './Tags'
    import ProjectIcons from './ProjectIcons'
    import EntityIcon from './EntityIcon'

    export let entity;
    export let title = "Quick 'Coin Health' audit template"

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

<div class="rowcomponent column fluid">
  <div class="head row fluid justify v-center">
    <div class="row v-center">
      <h2 class="body-2 txt-r mrg-s mrg--r">{title}</h2>
      <ProjectIcons projects={PROJECTS} />
    </div>
    <EntityIcon type={entity} />
  </div>
  <div class="fluid row justify v-center">
    <User />
    <Stat />
  </div>
</div>

<style>
  .rowcomponent {
    padding: 12px 24px;
    border: 1px solid var(--porcelain);
    border-top: none;
    cursor: pointer;
  }

  .rowcomponent:hover {
    background-color: var(--athens);
  }

  .head {
    margin-bottom: 10px;
  }
</style>
