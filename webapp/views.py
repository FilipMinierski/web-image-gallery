import json

from flask import Blueprint, render_template, redirect, request, make_response

from .video import vdb

views = Blueprint("views", __name__)

config = None

vdb.load()


@views.route("/", methods=["GET"])
def index():
    return redirect("/gallery?query=&page=1")


@views.route("/gallery", methods=["GET"])
def gallery():
    query = request.args.get("query", default="", type=str).lower()
    page = request.args.get("page", default=1, type=int)

    videos = vdb.search(query)

    return render_template("gallery.html", query=query,
                           page=page,
                           videos=videos)


@views.route("/gallery/content", methods=["GET"])
def gallery_content():
    return json.dumps(vdb.queried)


@views.route("/watch", methods=["GET"])
def gallery_post():
    post_id = request.args.get("id", default=0, type=int)

    return render_template("watch.html", post=vdb.find_by_id(post_id).to_dict())


@views.route("/getcontent", methods=["GET"])
def get_content():
    post_id = request.args.get("id", default=0, type=int)

    return json.dumps(vdb.find_by_id(post_id).to_dict())


@views.route("/updatescore", methods=["POST"])
def update_score():
    change = int(request.json["change"])
    _id = int(request.json["id"])
    post = vdb.find_by_id(_id)
    if post is None:
        return make_response(json.dumps(404))
    post.score += change
    vdb.save()
    return make_response(json.dumps(200))


@views.route("/settings", methods=["GET"])
def settings():
    return render_template("settings.html")


@views.route("/settings/config", methods=["GET"])
def settings_config():
    global config

    if config is None:
        with open("webapp\\config.json", "r") as file:
            config = json.load(file)

    return json.dumps(config)


@views.route("/settings/update", methods=["POST"])
def settings_update():
    new_config = request.json["new_config"]
    print(new_config)

    return make_response(json.dumps(200))
