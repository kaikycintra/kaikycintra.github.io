from django.shortcuts import render, redirect
from django.urls import reverse
from . import util
import markdown2 as md
from random import choice

def get_random_entry():
    entries = util.list_entries()
    return choice(entries) if entries else None

def test(request):
    return render(request, "encyclopedia/test.html"), {
        "random": get_random_entry()
    }

def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries(),
        "random": get_random_entry()
    })

def entry(request, title):
    entry_content = util.get_entry(title)
    if entry_content is None:
        return render(request, "encyclopedia/entryerror.html", {
            "random": get_random_entry(),
        })
    return render(request, "encyclopedia/entry.html", {
        "title": title,
        "entry": md.markdown(entry_content),
        "random": get_random_entry()
    })

def search(request):
    query = request.GET.get('q')
    entries = util.list_entries()
    
    # If the query exactly matches an entry, redirect to that entry
    if query in entries:
        return redirect('entry', title=query)
    
    # If not, find entries containing the query as a substring
    matching_entries = [entry for entry in entries if query.lower() in entry.lower()]

    return render(request, "encyclopedia/search.html", {
        "query": query,
        "entries": matching_entries,
        "random": get_random_entry(),
    })

def create(request):
    if request.method == "POST":
        title = request.POST.get("title")
        content = request.POST.get("content")
        util.save_entry(title, content)
        return redirect('entry', title=title)
    return render(request, "encyclopedia/create.html", {
        "random": get_random_entry(),
    })

def edit(request, title):
    entry_content = util.get_entry(title)
    if request.method == "POST":
        title = request.POST.get("title")
        content = request.POST.get("content")
        util.save_entry(title, content)
        return redirect('entry', title=title)

    return render(request, "encyclopedia/edit.html", {
        "title": title,
        "current_text": entry_content,
        "random": get_random_entry(),
    })